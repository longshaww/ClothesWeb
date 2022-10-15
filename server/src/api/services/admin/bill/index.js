const UpdatePending = require('./ConcreteStrategy/UpdatePending');
const UpdateConfirmation = require('./ConcreteStrategy/UpdateConfirmation');
const Bill = require('../../../models/BillWeb');
const UpdateCancel = require('./ConcreteStrategy/UpdateCancel');
const UpdateFailedConfirm = require('./ConcreteStrategy/UpdateFailedConfrim');
const CancelBills = require('../../../models/CancelBill');
class BillAdminService {
    constructor() {
        this.strategy = null;
    }

    async createStrategy(dataInput) {
        switch (dataInput.methodType) {
            case 'PENDING':
                this.strategy = new UpdatePending(dataInput.idBill);
                break;
            case 'SUCCESSFUL_DELIVERY_CONFIRMATION':
                this.strategy = new UpdateConfirmation(dataInput.idBill);
                break;
            case 'FAILED_DELIVERY_CONFIRMATION':
                this.strategy = new UpdateFailedConfirm(dataInput.idBill);
                break;
            case 'CANCEL_BILL':
                this.strategy = new UpdateCancel(dataInput.idBill, dataInput.reason);
                break;
            default:
                this.strategy = null;
                break;
        }
    }
    async execute() {
        return await this.strategy.update();
    }

    async getBillOfID(idBillWeb) {
        try {
            const bill = await Bill.findById(idBillWeb);
            bill ?? null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async updateStatusMoney(idCancelBill) {
        try {
            const cancelBill = await CancelBills.findById(idCancelBill).populate('billID');
            if (
                cancelBill.billID.status === 'CANCEL_BILL' &&
                cancelBill.moneyStatus === 'NEED_REFUNDS'
            ) {
                cancelBill.moneyStatus = 'REFUNDS';
                await cancelBill.save();
                return cancelBill;
            }
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
module.exports = BillAdminService;
