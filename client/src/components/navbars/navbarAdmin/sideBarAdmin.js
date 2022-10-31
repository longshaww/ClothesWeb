import '../../../assets/styles/admin/sidebar.css';
import { LineStyle, PermIdentity, Storefront, AttachMoney } from '@material-ui/icons';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Sidebar() {
    const [cookies] = useCookies(['user']);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {cookies?.user?.role === 0 && (
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Thống Kê</h3>
                        <ul className="sidebarList">
                            <Link to="/admin/dashboard" className="link">
                                <li className="sidebarListItem active">
                                    <LineStyle className="sidebarIcon" />
                                    Thống Kê
                                </li>
                            </Link>
                        </ul>
                    </div>
                )}
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quản Lý</h3>
                    <ul className="sidebarList">
                        {cookies?.user?.role === 0 && (
                            <Link to="/admin/users" className="link">
                                <li className="sidebarListItem">
                                    <PermIdentity className="sidebarIcon" />
                                    Người Dùng
                                </li>
                            </Link>
                        )}
                        <Link to="/admin/products" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Sản Phẩm
                            </li>
                        </Link>
                        <Link to="/admin/bills" className="link">
                            <li className="sidebarListItem">
                                <AttachMoney className="sidebarIcon" />
                                Hóa Đơn
                            </li>
                        </Link>
                        <Link to="/admin/vouchers" className="link">
                            <li className="sidebarListItem">
                                <CardGiftcardIcon className="sidebarIcon" />
                                Voucher
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
