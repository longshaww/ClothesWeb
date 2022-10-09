import { Card, CardImg, CardBody, CardGroup, Label, Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchCollections, filterCollections } from '../../actions/collections';
import { pagination } from '../../actions/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { setPage } from '../../actions/pagination';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from '../loading';
import './card.css';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Input, Button, Divider } from 'antd';

export default function RenderDependOnCollection(collections, endpoint, filter, pag) {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.pagination.page);
    const handlePagination = (event, value) => {
        dispatch(setPage(value));
    };

    if (!pag && !filter) {
        dispatch(fetchCollections(endpoint));
    }

    if (pag) {
        dispatch(pagination(endpoint, pag));
    }
    if (filter) {
        dispatch(filterCollections(endpoint, filter));
    }
    const [sortData, setSortData] = useState({
        price: undefined,
        createdAt: undefined,
    });
    const handleChange = (payload, type) => {
        setSortData((prev) => {
            if (type === 'price') return { ...prev, price: payload };
            else return { ...prev, createdAt: payload };
        });
    };

    useEffect(() => {
        if (sortData.price) {
            //handle sort theo giá

            if (sortData.price === 'inc') {
                collections?.sort(function (a, b) {
                    return b.price - a.price;
                });
            } else {
                collections?.sort(function (a, b) {
                    return a.price - b.price;
                });
            }
        }
        if (sortData.createdAt) {
            //handle sort ngày
        }
    }, [sortData]);
    const [price, setPrice] = useState(100000);

    const { Option } = Select;
    return (
        <Container>
            <Row>
                <Col md={2} lg={2} xl={2}>
                    <Container>
                        <Row className="pt-2">
                            <Col md={12} lg={12} xl={12}>
                                <span className="text-cate">DANH MỤC SẢN PHẨM</span>
                                <Divider />
                                <ul className="ul-category">
                                    <li className="ul-category-item">Tất cả</li>
                                    <li className="ul-category-item">New arrivals</li>
                                    <li className="ul-category-item">Tops</li>
                                    <li className="ul-category-item">Bottoms</li>
                                    <li className="ul-category-item">Outerwears</li>
                                    <li className="ul-category-item">Accessories</li>
                                </ul>
                            </Col>
                        </Row>
                        {/* <Row className="pt-2">
                            <Col md={12} lg={12} xl={12}>
                                <span className="text-cate">GIÁ</span>
                                <Divider />
                            </Col>
                        </Row> */}
                    </Container>
                </Col>
                <Col md={10} lg={10} xl={10}>
                    <Container>
                        <Row className="pt-2 ">
                            <Col className="ml-2" sm="2" md="2" lg={1}>
                                <Button className="custom-btn">Mới nhất</Button>
                            </Col>
                            <Col className="ml-2" sm="2" md="2" lg={1}>
                                <Button className="custom-btn">Bán chạy</Button>
                            </Col>
                            <Col className="ml-2" sm="3" md="3" lg={2}>
                                <Select
                                    className="custom-select"
                                    onChange={(payload) => handleChange(payload, 'price')}
                                    placeholder="Sắp xếp"
                                >
                                    <Option value="inc">Giá tăng dần</Option>
                                    <Option value="dec">Giá giảm dần</Option>
                                    <Option selected value="newest">
                                        Sắp xếp từ A-Z
                                    </Option>
                                    <Option value="oldest"> Sắp xếp từ Z-A</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            {/* List product */}
                            <CardGroup>
                                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 ">
                                    {collections.map((collection) => {
                                        return (
                                            <Card key={collection._id} className="col border-0 ">
                                                <CardImg
                                                    alt="Card image cap"
                                                    src={collection.description.imageList[0]}
                                                    width="100%"
                                                />
                                                <CardBody>
                                                    <div className="text-center">
                                                        <p>{`${collection.nameProduct}`}</p>
                                                        <p className="text-muted">
                                                            {`${collection.description.price}.000đ`}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        to={`/product/${collection._id}`}
                                                        className="stretched-link"
                                                    ></Link>
                                                </CardBody>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </CardGroup>
                            {collections.length ? (
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
                            ) : (
                                <Loading></Loading>
                            )}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
