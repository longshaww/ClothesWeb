const Bill = require('../../models/BillWeb');
const moment = require('moment');
const BillService = require('../../services/admin/bill/index');
class BillAdminController {
    async getAllBill(req, res, next) {
        const listBill = await Bill.find({});
        let listBillCustom = [];

        Promise.all(
            listBill.map(async (el) => {
                let customData = {
                    id: el['_id'],
                    qtyProduct: el['qtyProduct'],
                    total: el['total'] + ',000 VND',
                    paymentMethod: el.paymentMethod,
                    status: el.status,
                    createdAt: moment(el['createdAt']).format('DD/MM/YYYY'),
                };

                await listBillCustom.push(customData);
            })
        );
        res.status(200).json({
            success: true,
            listBillCustom,
        });
    }
    async updateStatus(req, res, next) {
        try {
            const idBill = req.params.idBill;
            const typeUpdate = req.query.typeUpdate;
            const reason = req.body.reason ?? null;
            if (idBill == '' || typeUpdate == '' || typeUpdate == null || idBill == null) {
                res.status(404).json({
                    success: false,
                    message: 'ERROR DATA REQUEST',
                });
            }
            const dataInput = {
                methodType: typeUpdate,
                idBill,
                reason,
            };
            const billService = new BillService();
            await billService.createStrategy(dataInput);
            const result = await billService.execute();
            result
                ? res.status(404).json({
                      success: true,
                      dataBill: result,
                  })
                : res.status(404).json({
                      success: false,
                      msg: 'Update bill failed',
                  });
        } catch (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
    async updateStatusMoneyCancelBill(req, res, next) {
        try {
            const idCancelBill = req.params.idCancelBill;
            if (!idCancelBill || idCancelBill.length === 0) {
                res.status(404).json({
                    success: false,
                    msg: 'Error request',
                });
            }
            const billService = new BillService();
            return await billService.updateStatusMoney(idCancelBill).then((data) => {
                data
                    ? res.status(200).json({
                          success: true,
                          dataCancelBill: data,
                      })
                    : res.status(404).json({
                          success: false,
                          msg: 'Update statusMoney bill failed',
                      });
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                msg: err.message,
            });
        }
    }
}
module.exports = new BillAdminController();
