const {Bill, CancelBill} = require('../../../models/index');
const {
    UpdatePending,
    UpdateConfirmation,
    UpdateCancel,
    UpdateFailedConfirm,
} = require('./ConcreteStrategy/index');

class BillAdminService {
    constructor() {
        this.strategy = null;
    }

    async createStrategy(dataInput) {
        switch (dataInput.methodType) {
            case 'DELIVERY':
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
            return bill ?? null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateStatusMoney(idCancelBill) {
        try {
            const cancelBill = await CancelBill.findById(idCancelBill).populate('billID');
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
            throw new Error(err.message);
        }
    }
}
module.exports = BillAdminService;
