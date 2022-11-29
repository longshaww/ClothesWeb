import React from 'react';
import { Card, CardImg, CardBody, CardGroup, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import './card.css';
import 'antd/dist/antd.css';

const ProductList = (props) => {
    return (
        <Container>
            <Row>
                {/* List product */}
                <CardGroup>
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 ">
                        {props.data.map((collection) => {
                            return (
                                <Card key={collection._id} className="col border border-0 ">
                                    {collection?.lable != 'hide' && (
                                        <>
                                            <span className="text-right">
                                                {collection.lable && (
                                                    <Badge color="danger">{collection.lable}</Badge>
                                                )}
                                            </span>

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
                                        </>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </CardGroup>
            </Row>
        </Container>
    );
};

export default ProductList;
