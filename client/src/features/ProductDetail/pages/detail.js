import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { setCart } from '../../../actions/cart';
import axiosMethod from '../../../middlewares/axios';
import '../../../assets/styles/detail.css';
import Toast from '../../../utils/toast';
import RatingList from '../components/RatingList';

export default function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const cartCount = useSelector((state) => state.cart.cartCount);
    const [productDetail, setProductDetail] = useState();
    const [imageIndex, setImageIndex] = useState(0);
    const [checked, setChecked] = useState('');
    const [qty, setQty] = useState(1);
    const [reviewList, setReviewList] = useState();
    useEffect(() => {
        async function fetchProductDetail() {
            const data = await axiosMethod(`product/${id}`, 'get');
            setProductDetail(data);
            return data;
        }
        fetchProductDetail();
    }, [id]);

    useEffect(() => {
        const data = axiosMethod(`product/rate/${id}`, 'get');
        data.then((res) => {
            setReviewList(res.body);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);
    let productSize;
    let productId;
    let count = 0;
    if (productDetail) {
        productSize = [...productDetail.size].reverse();
        productId = productDetail._id;

        productDetail?.size.forEach((item) => (count += parseInt(item.qty)));
    }

    const handleMinus = () => {
        setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    };

    const handlePlus = (checked) => {
        if (checked !== '') {
            const filterDataSizeChecked = productDetail?.size.filter(
                (item) => item.sizeName === checked
            );

            if (qty < parseInt(filterDataSizeChecked[0].qty)) setQty((prevQty) => prevQty + 1);
            else
                Toast.fire({
                    title: 'Kho không đủ sản phẩm',
                    icon: 'error',
                });
        } else setQty((prevQty) => prevQty + 1);
    };

    const handleQtyChange = (e) => {};

    //post cart
    async function postCart() {
        const body = {
            idProduct: productId,
            qty,
            size: checked,
            img: productDetail.description.imageList[0],
            name: productDetail.nameProduct,
            price: productDetail.price,
        };

        if (body.size === '')
            Toast.fire({
                title: 'Bạn chưa chọn size',
                icon: 'error',
            });
        else {
            try {
                const data = await axiosMethod('cart', 'post', body);
                dispatch(setCart(data.cartQty, data, data.cartTotal));
                Toast.fire({
                    title: 'Thêm vào giỏ hàng thành công',
                    icon: 'success',
                });
            } catch (err) {
                Toast.fire({ title: err.response.data.message, icon: 'error' });
            }
        }
    }

    const handleCheckout = () => {
        if (cartCount === 0) {
            return Toast.fire({
                title: 'Bạn chưa có sản phẩm nào trong giỏ hàng',
                icon: 'warning',
            });
        }
        navigate('/checkout');
    };

    const handleAddCart = () => {
        postCart();
    };

    const handleModalImage = () => {};

    return (
        <>
            {productDetail && (
                <>
                    <div className="container">
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div className="col">
                                <img
                                    src={productDetail.description.imageList[imageIndex]}
                                    onClick={handleModalImage}
                                    alt=""
                                    className="img-fluid"
                                ></img>
                                <div className="gallery d-flex">
                                    {productDetail.description.imageList.map((item, index) => {
                                        return (
                                            <img
                                                key={index}
                                                onClick={() => setImageIndex(index)}
                                                src={item}
                                                alt=""
                                                className="border ms-1 mt-1"
                                            ></img>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col">
                                <h4>{productDetail.nameProduct}</h4>
                                <h6 className="mb-3">{productDetail.price},000đ</h6>
                                <div className="d-flex mb-4">
                                    <div className="detail-size">
                                        {productSize.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setQty(1);
                                                    if (item.qty > 0) setChecked(item.sizeName);
                                                    if (item.qty <= 0 || checked === item.sizeName)
                                                        setChecked('');
                                                }}
                                                className={
                                                    item.qty > 0
                                                        ? checked === item.sizeName
                                                            ? 'size size-active size-action'
                                                            : 'size  size-action'
                                                        : 'size'
                                                }
                                            >
                                                {item.sizeName}
                                                {item.qty <= 0 && (
                                                    <div className="size-disable">
                                                        <i className="bx bx-x"></i>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-inline-flex shadow rounded quantity mb-4">
                                    <button onClick={handleMinus} className="btn btn-light">
                                        -
                                    </button>
                                    <input
                                        className="form-control border-0 text-center"
                                        onChange={handleQtyChange}
                                        value={qty}
                                    ></input>
                                    <button
                                        onClick={() => handlePlus(checked)}
                                        className="btn btn-light"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="wrap-btn">
                                    {count > 0 ? (
                                        <div>
                                            <button
                                                onClick={handleAddCart}
                                                className="btn btn-dark btn-cart d-block mb-3"
                                            >
                                                Thêm vào giỏ hàng
                                            </button>
                                            <button
                                                onClick={handleCheckout}
                                                className="btn btn-dark btn-cart d-block mb-3"
                                            >
                                                Thanh toán
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-dark btn-cart d-block mb-3">
                                            Cháy hàng
                                        </button>
                                    )}
                                </div>
                                <div className="product-description">
                                    <div className="fs-6 fw-bold text-decoration-underline pb-3 border-bottom">
                                        MÔ TẢ SẢN PHẨM
                                    </div>
                                    <div className="mb-3">
                                        {productDetail.description.productDes}
                                    </div>
                                    <div className="fs-6 fw-bold text-decoration-underline pb-3 border-bottom">
                                        ĐÁNH GIÁ CỦA NGƯỜI MUA
                                    </div>
                                    <div className="mb-3">
                                        <RatingList reviewList={reviewList || []} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="container">
						<h4 className=" pb-3 border-bottom text-center">
							SẢN PHẨM LIÊN QUAN
						</h4>
					</div> */}
                </>
            )}
        </>
    );
}
