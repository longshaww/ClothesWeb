const User = require("../../models/User");
const Bill = require("../../models/Bills");
const Product = require("../../models/Product");
const moment = require("moment");
class DashBoardController {
    // [GET] /admin/dashboard/getDashBoard
    async getDashboard(req, res, next) {
        const d = await new Date();
        let month = d.getMonth() + 1;
        let qtyBill = 0;
        const listBillOffMonth = await Bill.aggregate([
            {
                $redact: {
                    $cond: [
                        { $eq: [{ $month: "$createdAt" }, month] },
                        "$$KEEP",
                        "$$PRUNE",
                    ],
                },
            },
        ]);
        const qtyProduct = await Product.find({}).count();
        const qtyUser = await User.find({}).count();

        let dataBillCustom = []
        await Promise.all(await listBillOffMonth.map(async (el) => {

            el["createdAt"] = await moment(el["createdAt"], "MM-DD-YYYY").format("l");
            let totalMoney = await el['listProduct'].reduce(function (previousValue, currentValue) {
                return previousValue + currentValue.sum
            }, 0)
            let CustomData = {
                _id: el['_id'],
                customerID: el['customerID'],
                listProduct: el['listProduct'],
                totalMoney: totalMoney,
                paymentMethod: el['paymentMethod'],
                status: el['status'],
                createdAt: el['createdAt'],
                updatedAt: el['updatedAt'],
            }
            await dataBillCustom.push(CustomData)
            qtyBill++;
        }))
        let lineChartBill = [];
        let arrayChart = dataBillCustom.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }).reverse()
        let sentinel = false;
        let sentinelBeforeArray = false
        let sumMoneyOfDate = 0;

        for (let i = 0; i < arrayChart.length; i++) {

            // TH1  : TIEP TUC CHAY DANG TRONG CHUNG GIA TRI 
           

            if(i !== arrayChart.length-1)
            {                
                if (arrayChart[i].createdAt === arrayChart[i + 1].createdAt) {
                    // CONG 1 GIA TRI VI DA CONG 2 GIA TRI BAN DAU R 
                    if (sentinel) {
                        sumMoneyOfDate += arrayChart[i].totalMoney
                    }
                    else
                    // CONG 2 GIA tri ban dau 
                    {
                        sumMoneyOfDate = arrayChart[i].totalMoney + arrayChart[i + 1].totalMoney;
                        sentinel = true;
                        sentinelBeforeArray = true;
                        i++;
                    }

                }
                else if (arrayChart[i].createdAt !== arrayChart[i + 1].createdAt && sentinelBeforeArray === true) {
                        sumMoneyOfDate += arrayChart[i].totalMoney
                        sentinel = false
                        let customData = {
                            name: arrayChart[i].createdAt,
                            "totalMoney": sumMoneyOfDate
                        }
                        lineChartBill.push(customData);
                        sentinelBeforeArray = false
                        sumMoneyOfDate = 0;
                    }
                    else {
                        sumMoneyOfDate = arrayChart[i].totalMoney;
                        let customData = {
                            name: arrayChart[i].createdAt,
                            "totalMoney": sumMoneyOfDate
                        }
                        lineChartBill.push(customData);
                        sumMoneyOfDate = 0;
    
                    }
                }    
                else {
                    sumMoneyOfDate = arrayChart[i].totalMoney;
                    let customData = {
                        name: arrayChart[i].createdAt,
                        "totalMoney": sumMoneyOfDate
                    }
                    lineChartBill.push(customData);
                    sumMoneyOfDate = 0;

                }

        }
        res.send({
            success: true,
            bills: {
                listBillOffMonth: dataBillCustom,
                arrayChart,
                lineChartBill,
                qtyBill,
            },
            qtyProduct,
            qtyUser,
        });
    }
}

module.exports = new DashBoardController();
