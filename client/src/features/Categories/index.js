import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import '../../assets/styles/collections.nav.css';
import ProductList from '../../components/ProductList';
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
    const navigate = useNavigate();
    const handleChange = (payload) => {
        setType(payload);
    };
    const handlePagination = (event, value) => {
        setPage(value);
    };

    const [collections, setCollections] = useState(undefined);

    useEffect(() => {
        async function fetchData() {
            try {
                let urlRequest = `collections/${param.toLowerCase()}?page=${page}`;
                if (type)
                    urlRequest = `collections/${param.toLowerCase()}?type=${type}&page=${page}`;
                const data = await axiosMethod(urlRequest, 'GET');

                setCollections(data);
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        }
        fetchData();
    }, [param, type, page]);
    const { Option } = Select;
    return (
        <div>
            <Breadcrumb className="bg-light">
                <div className="container">
                    <BreadcrumbItem className="d-inline-block">
                        <Link to="/" className="nav-link">
                            Trang chủ
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem className="d-inline-block">
                        <Link to="/collections" className="nav-link">
                            Danh mục
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem className="d-inline-block">
                        <Link to={`/categories/${param}`} className="nav-link disabled text-muted">
                            {param}
                        </Link>
                    </BreadcrumbItem>
                </div>
            </Breadcrumb>

            <div className="container">
                <div className="border-bottom border-dark mt-4">
                    <h1>{param}</h1>
                </div>

                {/* component filter */}
                <Row className="pt-2 ">
                    <Col className="ml-2" sm="3" md="3" lg={2}>
                        <Select
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
