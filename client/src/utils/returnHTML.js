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
                text : 'Dưới 500.000đ',
                point : 0 
            };
        case 'Silver':
            return {
                text : '500.000 đ đến 1.000.000 đ',
                point : 500};
        case 'Gold':
            return {
                text : '1.000.000 đ đến 5.000.000 đ ',
                point : 1000};
        case 'Platinum':
            return {
                text : '5.000.000 đ trở đến ',
                point : 5000};
        default:
            return 0;
    }
};
