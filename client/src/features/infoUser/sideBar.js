import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import PasswordIcon from '@mui/icons-material/Password';
import { Link, useLocation } from 'react-router-dom';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import './index.css';
import { useCookies } from 'react-cookie';
import 'boxicons';
const MENU = [
    {
        text: 'Thông tin tài khoản',
        icon: <PermIdentityRoundedIcon />,
        url: '/user',
    },
    {
        text: 'Đổi mật khẩu',
        icon: <PasswordIcon />,
        url: '/user/changePassword',
    },
    {
        text: 'Điểm tích lũy',
        icon: <StarHalfIcon />,
        url: '/user/my-point',
    },
    {
        text: 'Lịch sử',
        icon: <HistoryRoundedIcon />,
        url: '/user/historyBill',
    },
    {
        text: 'Đánh giá',
        icon: <ChatBubbleOutlineIcon />,
        url: '/user/feedback',
    },
];
export default function SideBarUser() {
    const [cookies] = useCookies(['user']);
    const pathname = useLocation().pathname;
    return (
        <div
            className="d-flex flex-column align-items-center shadow-sm p-5 position-fixed"
            style={{ height: '100vh' }}
        >
            <div className="account-info">
                <div className="acc-avt-user d-lg-block d-none mb-2">
                    <img src="https://static.vecteezy.com/system/resources/previews/005/545/335/original/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" />
                </div>
                <div className="acc-info-user d-lg-block d-none">
                    <p>{cookies?.user?.information?.name}</p>
                </div>
            </div>
            <ul className="list-unstyled mt-3">
                {MENU.map((item, index) => {
                    return (
                        <li key={index} className="current">
                            <Link
                                className={
                                    pathname === item.url
                                        ? 'inline-flex cursor-pointer pt-1 m-active'
                                        : 'inline-flex cursor-pointer pt-1'
                                }
                                to={item.url}
                            >
                                <label>{item.icon}</label>
                                <span className="d-lg-block d-none">{item.text}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
