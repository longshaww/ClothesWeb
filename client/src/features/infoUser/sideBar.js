import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Link } from "react-router-dom";
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
export default function SideBarUser() {
	return (
		<>
			<h3 class="AccountTitle titleSidebar">Tài khoản</h3>
			<div class="AccountContent">
				<div class="AccountList">
					<ul class="list-unstyled mt-3">
						<li class="current">
							<Link to="/user">
								<label>
									<PermIdentityRoundedIcon />
								</label>
								Thông tin tài khoản
							</Link>
						</li>
						<li className="mt-3">
							<Link to="/user/voucher">
								<label>
									<CardGiftcardIcon />
								</label>
								Voucher của tôi
							</Link>
						</li>
						<li className="mt-3">
							<Link to="/user/historyBill">
								<label>
									<HistoryRoundedIcon />
								</label>
								Lịch Sử
							</Link>
						</li>
						<li class="last mt-3">
							<Link to="">Đăng xuất</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
