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
