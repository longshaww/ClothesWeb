import '../../assets/styles/home.css';
import axiosMethod from '../../middlewares/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
    const [productNewArrivals, setProductNewArrivals] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        async function fetch() {
            const res = await axiosMethod('collections/get-15-newarrivals', 'GET');
            if (res.success === true) {
                setProductNewArrivals(res.listProduct);
            }
        }
        fetch();
    }, []);
    const renderNewArrivals = () => {
        return productNewArrivals.map((el) => {
            return (
                <Link to={`/product/${el._id}`} style={{ color: 'black' }} key={el._id}>
                    <div>
                        <li className="col">
                            <div className="product mx-3 my-2">
                                <img
                                    src={el.description.imageList[0]}
                                    alt=""
                                    className="img-fluid"
                                />
                                <img
                                    src={el.description.imageList[1]}
                                    alt=""
                                    className="img-fluid product_back-side"
                                />
                            </div>

                            <h4 className="fs-5 mb-2 ">{el.nameProduct}</h4>

                            <p className="">{el.price},000₫</p>
                        </li>
                    </div>
                </Link>
            );
        });
    };
    return (
        <div>
            {/* banner */}
            <div className="highclub">
                <div
                    id="carouselExampleCrossfade"
                    className="carousel slide carousel-fade"
                    data-mdb-ride="carousel"
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-mdb-target="#carouselExampleCrossfade"
                            data-mdb-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-mdb-target="#carouselExampleCrossfade"
                            data-mdb-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://file.hstatic.net/200000280689/file/z3348729031595_bc4693744958b1ae1cfff67b6fd492bf_9f6fe89750a8485ebddd2919d75a1c6c.jpg"
                                className="d-block w-100"
                                alt=""
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://file.hstatic.net/200000280689/file/z3348729031595_bc4693744958b1ae1cfff67b6fd492bf_9f6fe89750a8485ebddd2919d75a1c6c.jpg"
                                className="d-block w-100"
                                alt=""
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-mdb-target="#carouselExampleCrossfade"
                        data-mdb-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-mdb-target="#carouselExampleCrossfade"
                        data-mdb-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/*   highclub - style */}
            <div className="container-fluid">
                <p className="fs-1 text-uppercase text-center mt-5 mb-3 font_title">
                    highclub - style
                </p>
                <div className="row">
                    <div className="col-md-4 px-1 banner_item">
                        <img
                            alt=""
                            src="https://file.hstatic.net/200000280689/file/img_3988_580b7cd5e8814412b28c66a063f30fe3.jpeg"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-4 px-1 banner_item">
                        <img
                            alt=""
                            src="https://file.hstatic.net/200000280689/file/img_3748_a989988ac9bd419a9ebbaf4ab6a2fd26.jpeg"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-4 px-1 banner_item">
                        <img
                            alt=""
                            src="https://file.hstatic.net/200000280689/file/img_2582_025e7302be154b05997b6f0a2ef6715d.jpeg"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>

            {/* sản phẩm hot */}
            <div className="">
                <p className="fs-1 text-uppercase text-center mt-5 mb-3 font_title">Sản phẩm hot</p>
                <div className="container p-0">
                    <ul className="row row-cols-3 p-0">{renderNewArrivals()}</ul>
                </div>
            </div>
            {/*   dynamic style */}
            <div className="container-fluid mb-5">
                <p className="fs-1 text-uppercase text-center mt-5 mb-3 font_title">
                    dynamic style
                </p>
                <div className="row">
                    <div className="col-md-4 px-1 banner_item">
                        <img
                            alt=""
                            src="https://file.hstatic.net/200000280689/file/img_2593_7ca0a1527dc94da1bfe446cda9f4fda4.jpg"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-4 px-1 banner_item">
                        <img
                            alt=""
                            src="https://file.hstatic.net/200000280689/file/z2444515179107_f42dbb1907e4c68f9e18c48737f319f7_c9a22a72c1b34f21ab1beab727909bf6.jpeg"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-4 px-1 banner_item">
                        <img
                            alt=""
                            src="https://file.hstatic.net/200000280689/file/img_1286_4f874b0cfacd42a5abf8f746c1cf90b6.jpeg"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>

            {/* category */}
            <div className="container-fluid">
                <ul className="row row-cols-2 p-0">
                    <li className="col p-0">
                        <Link to="/collections/tops" className="box_collection">
                            <img
                                src="https://file.hstatic.net/200000280689/file/w1_c237390c0216408a9f9511bb569e9826.jpg"
                                alt=""
                                className="image_collection"
                            />
                            <div className="title_collection">
                                <p className="fs-2 fw-bold text-uppercase text-decoration-none text-dark font_title">
                                    top
                                </p>
                            </div>
                        </Link>
                    </li>
                    <li className="col p-0">
                        <Link to="/collections/outerwears" className="box_collection">
                            <img
                                src="https://file.hstatic.net/200000280689/file/w3_8b8f52d88bc9448c8c29e8dfbe378166.jpg"
                                alt=""
                                className="image_collection"
                            />
                            <div className="title_collection">
                                <p className="fs-2 fw-bold text-uppercase text-decoration-none text-dark font_title">
                                    outerwears
                                </p>
                            </div>
                        </Link>
                    </li>
                    <li className="col p-0">
                        <Link to="/collections/accessories" className="box_collection">
                            <img
                                src="https://file.hstatic.net/200000280689/file/w2_ac05ac28a33f4e4d97c5448a065e0ba3.jpg"
                                alt=""
                                className="image_collection"
                            />
                            <div className="title_collection">
                                <p className="fs-2 fw-bold text-uppercase text-decoration-none text-dark font_title">
                                    accessories
                                </p>
                            </div>
                        </Link>
                    </li>
                    <li className="col p-0">
                        <Link to="/collections/bottoms" className="box_collection">
                            <img
                                src="https://file.hstatic.net/200000280689/file/w4_ce7a4cc405f34069ac1f35d5fd84d340.jpg"
                                alt=""
                                className="image_collection"
                            />
                            <div className="title_collection">
                                <p className="fs-2 fw-bold text-uppercase text-decoration-none text-dark font_title">
                                    bottom
                                </p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>

            <footer className="bg-dark text-center text-white mt-5">
                <div className="text-center p-3 color_footer">
                    © 2020 Copyright:
                    <span className="text-white">HighClub.vn</span>
                </div>
            </footer>
        </div>
    );
}
