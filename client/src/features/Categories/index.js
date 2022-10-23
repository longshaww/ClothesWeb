import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import ProductList from '../../components/ProductList';
import MBreadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/loading';
import { Select } from 'antd';
import axiosMethod from '../../middlewares/axios';
const Categories = () => {
    const location = useLocation();
    let param = location.pathname.split('/');
    if (param.length > 2) {
        param = param[2].toUpperCase();
    } else {
        param = param[1].toUpperCase();
    }

    const [type, setType] = useState(null);
    const [page, setPage] = useState(1);
    const [hotProductList, setHotProductList] = useState(undefined);
    // const navigate = useNavigate();
    const handleChange = (payload) => {
        setType(payload);
    };
    const handlePagination = (event, value) => {
        setPage(value);
    };

    const [collections, setCollections] = useState(undefined);

    useEffect(() => {
        async function fetch() {
            const res = await axiosMethod('collections/get-15-newarrivals', 'GET');
            if (res.success === true) {
                const listId = res?.listProduct?.map((item) => item._id);
                setHotProductList(listId);
            }
        }
        fetch();
    }, []);

    // có vấn đề
    useEffect(() => {
        setType(null);
        setPage(1);
    }, [param]);

    // có vấn đề
    useEffect(() => {
        async function fetchData() {
            try {
                let urlRequest = `collections/${param.toLowerCase()}?page=${page}`;
                if (type)
                    urlRequest = `collections/${param.toLowerCase()}?type=${type}&page=${page}`;
                let data = await axiosMethod(urlRequest, 'GET');

                data = data.map((item) => {
                    const calSize =
                        parseInt(item.size[0].qty) +
                        parseInt(item.size[1].qty) +
                        parseInt(item.size[2].qty);
                    if (hotProductList?.includes(item._id)) {
                        return calSize === 0
                            ? { ...item, lable: 'Cháy hàng' }
                            : { ...item, lable: 'Hàng hot' };
                    }
                    if (!hotProductList?.includes(item._id)) {
                        return calSize === 0 ? 'hide' : item;
                    }
                });
                data = data.filter((item) => item !== 'hide');
                setCollections(data);
            } catch (error) {
                console.log(error);
                // navigate('/');
            }
        }
        if (hotProductList) fetchData();
    }, [param, type, page, hotProductList]);
    console.log(collections);
    const { Option } = Select;
    const breadcrumbList = [
        { isActive: true, text: 'Trang chủ', url: '/' },
        { isActive: true, text: 'Danh mục', url: '/collections' },
        { isActive: false, text: `${param}`, url: `/categories/${param}` },
    ];
    return (
        <div>
            <MBreadcrumb breadcrumbList={breadcrumbList} />
            <div className="container">
                <div className="border-bottom border-dark mt-4">
                    <h1>{param}</h1>
                </div>

                {/* component filter */}
                <Row className="pt-2 ">
                    <Col className="ml-2" sm="3" md="3" lg={2}>
                        <Select
                            allowClear
                            className="custom-select"
                            onChange={(payload) => handleChange(payload)}
                            placeholder="Sắp xếp"
                        >
                            <Option value="bestseller">Bán chạy</Option>
                            <Option value="ascending">Giá tăng dần</Option>
                            <Option value="descending">Giá giảm dần</Option>
                        </Select>
                    </Col>
                </Row>

                {/* component product */}
                <div id="collections">
                    {/* tùy theo param mà render data */}

                    {collections && <ProductList data={collections}></ProductList>}
                </div>

                {!collections && <Loading></Loading>}
                {/* pagination */}
                {collections && collections.length > 0 && (
                    <div className="d-flex justify-content-center p-3 m-3">
                        <Stack spacing={2}>
                            <Pagination
                                onChange={handlePagination}
                                page={page}
                                size="large"
                                variant="outlined"
                                count={7}
                                color="secondary"
                            />
                        </Stack>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
