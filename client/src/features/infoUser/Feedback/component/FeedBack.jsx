import React from 'react';
import { Button, CardBody, Input, UncontrolledCollapse } from 'reactstrap';
import Rating from '@mui/material/Rating';
import { Card } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import Toast from '../../../../utils/toast';
import VoucherIcon from '../../../../assets/images/voucher.svg';
const FeedBackProduct = ({ validProduct, setRender, cookies, loading }) => {
    const [valueRate, setValueRate] = useState({});
    const [content, setContent] = useState({});
    const [dataRate, setDataRate] = useState({});

    console.log(validProduct);
    const handleRate = (content, rate, idProduct) => {
        const body = {
            userID: cookies?.user?.id,
            data: {
                content: content,
                rate: rate,
            },
        };
        const endpoint = `${process.env.REACT_APP_API_URL}user/rate/${idProduct}`;
        const headers = {
            authorization: 'Bearer ' + cookies.accessToken,
        };
        axios
            .post(endpoint, body, { headers })
            .then((data) => {
                setRender((prev) => !prev);
                Toast.fire({
                    title: 'Đánh giá thành công',
                    icon: 'success',
                });
            })
            .catch((err) => {
                Toast.fire({
                    title: err.response.data.message,
                    icon: 'error',
                });
            });
    };

    const handleChangeRate = (index, newValue) => {
        const vl = { [index]: newValue };
        setValueRate((prev) => {
            return { ...prev, ...vl };
        });
    };
    const handleChangeContent = (index, value) => {
        const vl = { [index]: value };
        setContent((prev) => {
            return { ...prev, ...vl };
        });
    };

    const handleGetRate = (idProduct) => {
        const endpoint = `${process.env.REACT_APP_API_URL}user/getRateUser?userID=${cookies.user.id}&productID=${idProduct}`;
        const headers = {
            authorization: 'Bearer ' + cookies.accessToken,
        };
        axios
            .get(endpoint, { headers })
            .then((res) => {
                const data = res?.data?.listRate[0];
                setDataRate((prev) => {
                    return {
                        ...prev,
                        [data?.productID]: {
                            rate: data?.rate,
                            content: data?.content,
                        },
                    };
                });
            })
            .catch((err) => {
                console.log({ err });
                // Toast.fire({
                //     title: err.response.data.message,
                //     icon: 'error',
                // });
            });
    };

    return validProduct && validProduct.length > 0 ? (
        validProduct?.map((item, index) => (
            <div key={index} className="row product-rate p-2">
                <div className="p-2 d-flex">
                    <img className="img-product-rate" src={item.img} alt="" />
                    <div className="flex-1 ml-2">
                        <h5>{item.name}</h5>
                        <h5>Size: {item.size}</h5>
                        <h5>Giá: {item.price},000đ</h5>
                        <h5>Trạng thái: {item.isFeedBack ? 'Đã đánh giá' : 'Chưa đánh giá'}</h5>
                        {!item.isFeedBack ? (
                            <div className="mt-2">
                                <Button
                                    color="secondary"
                                    id={`id${index}`}
                                    style={{
                                        marginBottom: '1rem',
                                    }}
                                >
                                    Đánh giá
                                </Button>
                                <UncontrolledCollapse toggler={`id${index}`}>
                                    <Card>
                                        <CardBody>
                                            {/* rate */}

                                            <Rating
                                                name={`half-rating-${index}`}
                                                value={valueRate[index]}
                                                onChange={(event, newValue) => {
                                                    handleChangeRate(index, newValue);
                                                }}
                                            />

                                            {/* content */}
                                            <Input
                                                className="mt-1"
                                                placeholder="Vui lòng nhập đánh giá của bạn về sản phẩm"
                                                name={`content-rate-${index}`}
                                                type="textarea"
                                                value={content[index]}
                                                onChange={(e) =>
                                                    handleChangeContent(index, e.target.value)
                                                }
                                            />
                                            <Button
                                                className="mt-2"
                                                onClick={() =>
                                                    handleRate(
                                                        content[index],
                                                        valueRate[index],
                                                        item.idProduct
                                                    )
                                                }
                                                color="primary"
                                            >
                                                Gửi
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </UncontrolledCollapse>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <Button
                                    color="secondary"
                                    id={`id${index}`}
                                    style={{
                                        marginBottom: '1rem',
                                    }}
                                    onClick={() => handleGetRate(item.idProduct)}
                                >
                                    Xem đánh giá
                                </Button>
                                <UncontrolledCollapse toggler={`id${index}`}>
                                    {dataRate && (
                                        <Card>
                                            <CardBody>
                                                {/* rate */}

                                                <Rating
                                                    name={`read-only-${item.idProduct}`}
                                                    value={dataRate[item?.idProduct]?.rate || 0}
                                                    readOnly
                                                />

                                                {/* content */}
                                                <Input
                                                    className="mt-1"
                                                    placeholder="Vui lòng nhập đánh giá của bạn về sản phẩm"
                                                    name={`contentt-rate-${item.idProduct}`}
                                                    type="textarea"
                                                    value={dataRate[item?.idProduct]?.content}
                                                    readOnly
                                                />
                                            </CardBody>
                                        </Card>
                                    )}
                                </UncontrolledCollapse>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <img alt="point" className="mascot" src={VoucherIcon}></img>
        </div>
    );
};

export default FeedBackProduct;
