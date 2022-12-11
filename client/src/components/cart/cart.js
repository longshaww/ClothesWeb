import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Popover from '@mui/material/Popover';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import globalStateAndAction from '../../container/global.state.action';
import { useState, useEffect } from 'react';
import axiosMethod from '../../middlewares/axios';
import Toast from '../../utils/toast';
import 'boxicons';
import { useCookies } from 'react-cookie';

function PopupCart({ cart, setCart }) {
    //Get state from redux
    const cartCount = cart.cartCount;
    const cartStore = cart.cartStore;
    const cartTotalPrice = cart.cartTotalPrice;

    //Local state
    const [anchorEl, setAnchorEl] = useState(null);

    const [cookie] = useCookies(['sessionId']);
    //Get Cart at first
    useEffect(() => {
        async function getCart() {
            try {
                const data = await axiosMethod('cart', 'get');
                setCart(data.cartQty, data, data.cartTotal);
            } catch (err) {
                Toast.fire({ title: err.response.data.message, icon: 'error' });
            }
        }
        getCart();
    }, [cookie.sessionId]);

    async function handleChangeQty(idProduct, qty, size) {
        try {
            const data = await axiosMethod(`cart/changeQty`, 'put', {
                idProduct,
                qty,
                size,
            });
            setCart(data.cartQty, data, data.cartTotal);
        } catch (err) {
            Toast.fire({ title: err.response.data.message, icon: 'error' });
        }
    }
    async function deleteCart(idProduct, size) {
        try {
            const data = await axiosMethod(`cart/${idProduct}`, 'delete', {
                size,
            });
            setCart(data.cartQty, data, data.cartTotal);
            Toast.fire({
                title: 'Đã xóa sản phẩm khỏi giỏ hàng',
                icon: 'success',
            });
            return data;
        } catch (err) {
            Toast.fire({ title: err.response.data.message, icon: 'error' });
        }
    }

    // Cart handle
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //Cart Delete Event
    const handleDelClick = async (idProduct, size) => {
        await deleteCart(idProduct, size);
    };

    //MUI Cart Open handle

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Badge badgeContent={cartCount ? cartCount : '0'} color="primary">
            <i
                style={{ cursor: 'pointer', fontSize: '30px', position: 'relative' }}
                onClick={handleClick}
                className="bx bx-cart-alt"
            ></i>
            <Popover
                Gio
                hang
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box
                    sx={{
                        width: 450,
                        height: 300,
                    }}
                >
                    <div id="cart-container" className="py-3 px-4">
                        <div className="p-2 mb-3 mx-1  border border-1 rounded bg-light text-center">
                            Giỏ hàng
                        </div>
                        <table className="table">
                            <tbody>
                                {cartStore.cart && cartStore.cart.length > 0 ? (
                                    cartStore.cart.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="cart-product-img">
                                                    <img
                                                        src={item.img}
                                                        alt=""
                                                        className="border"
                                                    ></img>
                                                </td>
                                                <td className="cart-product-content">
                                                    <p className="cart-name-size">
                                                        <Link
                                                            to={`product/${item.idProduct}`}
                                                            className="d-block"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <span>{item.size}</span>
                                                    </p>
                                                    <div className="d-flex justify-content-between cart-price-qty">
                                                        <div className="d-inline-flex rounded quantity p-0">
                                                            <button
                                                                onClick={() =>
                                                                    handleChangeQty(
                                                                        item.idProduct,
                                                                        -1,
                                                                        item.size
                                                                    )
                                                                }
                                                                className="btn btn-light"
                                                            >
                                                                -
                                                            </button>
                                                            <div
                                                                className="d-flex justify-content-center align-items-center h-100 fw-bold"
                                                                style={{ width: '1rem' }}
                                                            >
                                                                {item.qty}
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    handleChangeQty(
                                                                        item.idProduct,
                                                                        1,
                                                                        item.size
                                                                    )
                                                                }
                                                                className="btn btn-light"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="fw-bold">
                                                            {`${item.total.toLocaleString()},000đ`}
                                                        </div>
                                                    </div>
                                                    <div className="cart-btn-del">
                                                        <ClearIcon
                                                            onClick={() =>
                                                                handleDelClick(
                                                                    item.idProduct,
                                                                    item.size
                                                                )
                                                            }
                                                        ></ClearIcon>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="text-center">Không có sản phẩm</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="cart-view-total ">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="text-start">TỔNG TIỀN</td>

                                        <td className="text-end text-danger fw-bold fs-5">
                                            {`${cartTotalPrice.toLocaleString()},000đ`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to="/cart">
                                                <button className="btn btn-dark py-2">
                                                    Xem giỏ hàng
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            {cartStore.cart && cartStore.cart.length === 0 ? (
                                                <button className="btn btn-dark py-2" disabled>
                                                    Thanh toán
                                                </button>
                                            ) : (
                                                <Link to={`/checkout`}>
                                                    <button className="btn btn-dark py-2">
                                                        Thanh toán
                                                    </button>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Box>
            </Popover>
        </Badge>
    );
}

export default globalStateAndAction(PopupCart);
