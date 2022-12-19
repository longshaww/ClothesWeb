import Collections from './features/Collections/pages/collections';
import Tops from './features/Tops/pages/tops';
import Bottoms from './features/Bottoms/pages/bottoms';
import Outerwears from './features/Outerwears/pages/outerwears';
import Accessories from './features/Accessories/pages/accessories';
import Sale from './features/Sale/pages/sale';
import Layout from './layouts/layout';
import Detail from './features/ProductDetail/pages/detail';
import CollectionsLayout from './features/Collections/pages/collections.layout';
import Categories from './features/Categories';
import DetailLayout from './features/ProductDetail/pages/detail.layout';
import NewArrivals from './features/New-Arrivals/pages/new.arrivals';
import Search from './features/Search/search';
import Cart from './features/Cart/pages/cart';
import Checkout from './features/Checkout/pages/checkout';
import { Routes, Route, Navigate } from 'react-router-dom';
import PaymentSuccess from './features/Payment/pages/success';
import CustomerInfo from './features/Checkout/components/customer.info';
import PaymentMethod from './features/Checkout/pages/payment.method';
import OnlinePayment from './features/Payment/pages/index';
import { useCookies } from 'react-cookie';
import LayoutAdmin from './layouts/layoutAdmin';
import Register from './components/auth/register';
import Home from './features/Home';
import Dashboard from './features/admin/dashboard/dashboard';
import ListUser from './features/admin/user/listUser';
import ProductList from './features/admin/product/productList';
import DetailProduct from './features/admin/product/productDetail';
import CreateProduct from './features/admin/product/createProduct';
import ListBill from './features/admin/bill/listBill';
import DetailBill from './features/admin/bill/detailBill';
import VerifyOtp from './components/auth/otp';
import ListVoucher from './features/admin/voucher/listVoucher';
import CreateVoucher from './features/admin/voucher/createVoucher';
import EditVoucher from './features/admin/voucher/editVoucher';
import DetailVoucher from './features/admin/voucher/detailVoucher';
import User from './features/infoUser/user';
import VoucherMe from './features/infoUser/voucher.me';
import LayoutUser from './layouts/layoutUser';
import BillMe from './components/listBill/bill';
import ChangePassword from './features/infoUser/changePassword';
import MyPoint from './features/infoUser/point';
import FeedBack from './features/infoUser/Feedback';
import ResetPassword from './components/auth/resetPassword';
import VerifyOTPForgetPassword from './components/auth/verifyOTPForgetPassword';
import ResetNewPassword from './components/auth/resetNewPassword';
import EditUser from './features/admin/user/editUser/index';
import FollowOrder from './features/followOrder/index';
import { isAdmin } from './utils/functionValidate';
import ReviewManagement from './features/admin/ReviewManagement';
function App() {
    const [cookies] = useCookies(['user']);
    let userLogin;
    if (cookies.user !== undefined) {
        userLogin = cookies.user;
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />}></Route>
                    <Route path="categories/:type" element={<Categories />}></Route>
                    <Route path="/followOrder" element={<FollowOrder />}></Route>

                    <Route path="collections" element={<CollectionsLayout />}>
                        <Route index element={<Collections />} />
                        <Route path="tops" index element={<Tops />}></Route>
                        <Route path="bottoms" index element={<Bottoms />}></Route>
                        <Route path="outerwears" index element={<Outerwears />}></Route>
                        <Route path="accessories" index element={<Accessories />}></Route>
                        <Route path="sale" index element={<Sale />}></Route>
                        <Route path="new-arrivals" index element={<NewArrivals />}></Route>
                    </Route>
                    <Route path="product" element={<DetailLayout></DetailLayout>}>
                        <Route path=":id" index element={<Detail></Detail>}></Route>
                    </Route>

                    <Route path="account">
                        <Route path="register" element={<Register />}></Route>
                        <Route path="verify/:id" element={<VerifyOtp />}></Route>
                        <Route path="resetPassword" element={<ResetPassword />}></Route>
                        <Route
                            path="verifyOTPForgetPassword"
                            element={<VerifyOTPForgetPassword />}
                        ></Route>
                        <Route path="resetNewPassword" element={<ResetNewPassword />}></Route>
                    </Route>
                    <Route
                        path="checkout/method/:payment/success"
                        index
                        element={<PaymentSuccess />}
                    ></Route>
                    <Route path="search">
                        <Route index element={<Search />}></Route>
                    </Route>
                    <Route path="cart" index element={<Cart />}></Route>
                    <Route path="checkout" element={<Checkout />}>
                        <Route index element={<CustomerInfo />} />
                        <Route path="method" index element={<PaymentMethod />}></Route>
                        <Route path="method/online" index element={<OnlinePayment />}></Route>
                    </Route>

                    <Route
                        path="checkout/method/:payment/success"
                        index
                        element={<PaymentSuccess />}
                    ></Route>

                    <Route path="user" element={userLogin ? <LayoutUser /> : <Navigate to="/" />}>
                        <Route index element={<User />}></Route>
                        <Route path="historyBill" index element={<BillMe />}></Route>
                        <Route path="detailBill/:id" index element={<DetailBill />}></Route>
                        <Route path="voucher" index element={<VoucherMe />}></Route>
                        <Route path="changePassword" index element={<ChangePassword />}></Route>
                        <Route path="my-point" index element={<MyPoint />}></Route>
                        <Route path="feedback" index element={<FeedBack />}></Route>
                    </Route>
                </Route>
                <Route
                    path="/admin"
                    element={
                        cookies?.user?.role === 0 || cookies?.user?.role === 1 ? (
                            <LayoutAdmin />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                >
                    <Route
                        path="dashboard"
                        element={
                            cookies?.user?.role === 0 ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/admin/products" />
                            )
                        }
                    ></Route>
                    <Route
                        path="users"
                        element={
                            cookies?.user?.role === 0 ? (
                                <ListUser />
                            ) : (
                                <Navigate to="/admin/products" />
                            )
                        }
                    ></Route>
                    <Route path="users/info/:id" element={<EditUser />}></Route>
                    <Route path="products" element={<ProductList />}></Route>
                    <Route path="products/:id" element={<DetailProduct />}></Route>
                    <Route path="products/create" element={<CreateProduct />}></Route>
                    <Route path="vouchers" element={<ListVoucher />}></Route>
                    <Route path="vouchers/:id" element={<DetailVoucher />}></Route>
                    <Route path="vouchers/create" element={<CreateVoucher />}></Route>
                    <Route path="vouchers/edit/:id" element={<EditVoucher />}></Route>
                    <Route path="bills" element={<ListBill />}></Route>
                    <Route path="bills/:id" element={<DetailBill />}></Route>
                    <Route path="review-management" element={<ReviewManagement />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
