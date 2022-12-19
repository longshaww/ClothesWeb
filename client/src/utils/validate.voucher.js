import Toast from './toast';
import moment from 'moment';

export function validateVoucher(inputs) {
    const diffDays = moment(inputs.dateEnd).diff(moment(inputs.dateStart), 'days');
    if (!inputs.discount || !inputs.maxDiscount || !inputs.qualifyAmount || !inputs.qty) {
        Toast.fire({
            title: 'Các trường không được để trống',
            icon: 'error',
        });
        return false;
    }
    if (diffDays <= 0) {
        Toast.fire({
            title: 'Ngày kết thúc không thể trước ngày bắt đầu',
            icon: 'error',
        });
        return false;
    }
    if (inputs.discount > 50) {
        Toast.fire({
            title: 'Voucher giảm không quá 50%',
            icon: 'error',
        });
        return false;
    }
    if (inputs.discount < 10) {
        Toast.fire({
            title: 'Mức giảm không hợp lệ',
            icon: 'error',
        });
        return false;
    }
    if (inputs.maxDiscount > 500) {
        Toast.fire({
            title: 'Số tiền giảm tối đa không vượt quá 500.000đ',
            icon: 'error',
        });
        return false;
    }
    if (inputs.maxDiscount < 50) {
        Toast.fire({
            title: 'Số tiền giảm tối đa phải ít nhất 50.000đ',
            icon: 'error',
        });
        return false;
    }
    if (inputs.qualifyAmount < 100) {
        Toast.fire({
            title: 'Số tiền thỏa mãn điều kiện ít nhất 100.000đ',
            icon: 'error',
        });
        return false;
    }
    if (inputs.qty > 50) {
        Toast.fire({
            title: 'Số lượng voucher không vượt quá 50',
            icon: 'error',
        });
        return false;
    }
    if (inputs.qty <= 0) {
        Toast.fire({
            title: 'Số lượng voucher không hợp lệ',
            icon: 'error',
        });
        return false;
    }
    return true;
}
