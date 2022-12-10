import React, { useEffect, useState } from 'react';
import './index.css';

import axiosMethod from '../../../middlewares/axios';
import { useCookies } from 'react-cookie';
import { Table } from 'antd';
import RatingList from './components/RatingList';
const ReviewManagement = () => {
    const [cookies] = useCookies(['accessToken']);
    const [loading, setLoading] = useState(false);
    const [rate, setRate] = useState();
    const getData = () => {
        const endpoint = `admin/rate/getAllRate`;
        const response = axiosMethod(endpoint, 'GET', null, {
            authorization: 'Bearer ' + cookies.accessToken,
        });
        response
            .then((res) => {
                setLoading(false);
                let data = res.body?.data;
                data = data.map((item) => {
                    return {
                        idProuduct: item?.productID?._id,
                        idRate: item?._id,
                        name: item?.productID?.nameProduct,
                        image: item?.productID?.description?.imageList[0],
                        content: item?.content,
                        rate: item?.rate,
                        userID: item?.userID?._id,
                        fullname: item?.userID?.information?.name,
                    };
                });

                let ratings = Object.create(null);
                data.forEach((o) => (ratings[o.idProuduct] = ratings[o.idProuduct] || []).push(o));

                const dataSource = Object.keys(ratings).map((item, index) => {
                    const starCount = ratings[item].reduce(
                        (acc, item) => (acc += Number(item.rate)),
                        0
                    );

                    const rateCount = ratings[item].length;
                    const rateArg = (starCount / rateCount).toFixed(1);
                    return {
                        key: index,
                        name: ratings[item][0].name,
                        img: (
                            <img
                                style={{ width: '70px', height: '70px' }}
                                src={ratings[item][0].image}
                            />
                        ),
                        rateArg,
                        rateCount,
                        description: (
                            <RatingList
                                ratings={ratings}
                                item={item}
                                setLoading={setLoading}
                                getData={getData}
                            />
                        ),
                    };
                });

                setRate(dataSource);
            })
            .catch((err) => {
                console.log('🚀 ~ file: index.jsx:109 ~ getData ~ err', err);
                setLoading(true);
            });
    };

    useEffect(() => {
        setLoading(true);
        getData();
    }, []);

    const columns = [
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
        { title: 'Hình ảnh', dataIndex: 'img', key: 'img' },
        { title: 'Số sao trung bình', dataIndex: 'rateArg', key: 'rateArg' },
        { title: 'Tổng đánh giá', dataIndex: 'rateCount', key: 'rate' },
    ];

    return (
        <div className="pt-8 home ">
            <Table
                columns={columns}
                loading={loading}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>{record.description}</p>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={rate || []}
            />
        </div>
    );
};

export default ReviewManagement;
