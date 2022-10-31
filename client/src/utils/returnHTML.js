import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export const rankedUser = (moneyPayed) => {
    const money = moneyPayed;
    switch (true) {
        case money < 500:
            return {
                title: 'Thành Viên Đồng',
                color: '#cd7f32',
            };
        case (money >= 500) & (money < 1000):
            return {
                title: 'Thành Viên Bạc',
                color: '#c0c0c0',
            };
        case money >= 1000 && money < 5000:
            return {
                title: 'Thành Viên Vàng',
                color: '#FFD700',
            };
        case money > 5000:
            return {
                title: 'Thành Viên Bạch Kim',
                color: '#8CD86C',
            };
        default:
            return {
                title: 'Thành Viên Đồng',
                color: '#cd7f32',
            };
    }
};
export const returnMoney = (rank) => {
    switch (rank) {
        case 'Bronze':
            return {
                text: 'Dưới 500.000đ',
                point: 0,
            };
        case 'Silver':
            return {
                text: '500.000 đ đến 1.000.000 đ',
                point: 500,
            };
        case 'Gold':
            return {
                text: '1.000.000 đ đến 5.000.000 đ ',
                point: 1000,
            };
        case 'Platinum':
            return {
                text: '5.000.000 đ trở đến ',
                point: 5000,
            };
        default:
            return 0;
    }
};

export const returnMoneySale = (money, ranked) => {
    switch (ranked) {
        case 'Silver':
            return Math.round(money - (money * 5) / 100);
        case 'Gold':
            return Math.round(money - (money * 10) / 100);

        case 'Platinum':
            return Math.round(money - (money * 15) / 100);

        default:
            return money;
    }
};

export const returnPercentSale = (ranked) => {
    switch (ranked) {
        case 'Bronze':
            return 5;

        case 'Silver':
            return 10;

        case 'Gold':
            return 15;

        case 'Platinum':
            return 20;

        default:
            return 0;
    }
};

export const returnStatusOrder = (status) => {
    switch (status) {
        case 'PENDING':
            return (
                <>
                    <AccessTimeIcon className="text-warning" size={25} />
                    <span className="ml-2">Chờ Xét Duyệt</span>
                </>
            );
        case 'DELIVERY':
            return (
                <>
                    <LocalShippingIcon size={25} />
                    <span className="ml-2">Đang Giao Hàng</span>
                </>
            );
        case 'SUCCESSFUL_DELIVERY_CONFIRMATION':
            return (
                <>
                    <CheckCircleOutlineIcon className="text-success" size={25} />
                    <span className="ml-2">Giao Hàng Thành Công</span>
                </>
            );
        case 'FAILED_DELIVERY_CONFIRMATION':
            return (
                <>
                    <HighlightOffIcon className="text-danger" size={25} />
                    <span className="ml-2">Giao Hàng Thất Bại</span>
                </>
            );
        case 'CANCEL_BILL':
            return (
                <>
                    <HighlightOffIcon className="text-danger" size={25} />
                    <span className="ml-2">Giao Hàng Thất Bại</span>
                </>
            );
        default:
            return (
                <>
                    <AccessTimeIcon className="text-warning" size={25} />
                    <span className="ml-2">Chờ Xét Duyệt</span>
                </>
            );
    }
};
