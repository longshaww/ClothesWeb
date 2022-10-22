import React from 'react';
import { Link } from 'react-router-dom';

function EmptyBill() {
    return (
        <div className="text-center p-5 shadow rounded-3">
            <h3 className="text-danger">Bạn Chưa Có Đơn Hàng Nào</h3>
            <Link to="/collections/new-arrivals?page=1" className="fs-5 text-primary">
                Sắm Đồ Thôi Nào ?
            </Link>
        </div>
    );
}

export default EmptyBill;
