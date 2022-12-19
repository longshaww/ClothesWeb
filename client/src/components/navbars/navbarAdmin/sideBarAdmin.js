import '../../../assets/styles/admin/sidebar.css';
import { useState, useEffect } from 'react';
import { LineStyle, PermIdentity, Storefront, AttachMoney } from '@material-ui/icons';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Sidebar() {
    const [cookies] = useCookies(['user']);
    const location = useLocation().pathname;
    const [managementPath, setManagementPath] = useState([
        {
            url: '/admin/users',
            text: 'Người Dùng',
            icon: <PermIdentity className="sidebarIcon" />,
        },
        {
            url: '/admin/products',
            text: 'Sản phẩm',
            icon: <Storefront className="sidebarIcon" />,
        },
        {
            url: '/admin/bills',
            text: 'Hóa đơn',
            icon: <AttachMoney className="sidebarIcon" />,
        },
        {
            url: '/admin/vouchers',
            text: 'Voucher',
            icon: <CardGiftcardIcon className="sidebarIcon" />,
        },
        {
            url: '/admin/review-management',
            text: 'Đánh giá',
            icon: <ReviewsOutlinedIcon className="sidebarIcon" />,
        },
    ]);
    useEffect(() => {
        if (cookies?.user?.role === 1) {
            const clonedPaths = [...managementPath];
            clonedPaths.shift();
            setManagementPath(clonedPaths);
        }
    }, [cookies]);

    const STATISTICAL_PATH = [
        {
            url: '/admin/dashboard',
            text: 'Thống kê',
            icon: <LineStyle className="sidebarIcon" />,
        },
    ];

    return (
        <div className="sidebar shadow">
            <div className="sidebarWrapper">
                {cookies?.user?.role === 0 && (
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Thống Kê</h3>
                        <ul className="sidebarList">
                            {STATISTICAL_PATH.map((item, index) => {
                                return (
                                    <Link key={`s${index}`} to={item.url} className="link">
                                        <li
                                            className={
                                                location === item.url
                                                    ? 'sidebarListItem active'
                                                    : 'sidebarListItem'
                                            }
                                        >
                                            {item.icon}
                                            {item.text}
                                        </li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quản Lý</h3>
                    <ul className="sidebarList">
                        {managementPath.map((item, index) => {
                            return (
                                <Link key={`m${index}`} to={item.url} className="link">
                                    <li
                                        className={
                                            location === item.url
                                                ? 'sidebarListItem active'
                                                : 'sidebarListItem'
                                        }
                                    >
                                        {item.icon}
                                        {item.text}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
