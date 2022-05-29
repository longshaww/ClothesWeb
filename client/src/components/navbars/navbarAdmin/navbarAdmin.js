import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import "../../../assets/styles/admin/narbaradmin.css";
import Logo from "../../../assets/images/hyperX.jpeg";
export default function NavbarAppAdmin() {
	return (
        <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo"><div id="center-logo" className="mt-4">
					<img
						id="logo"
						src={Logo}
						alt=""
						className="logo-Img"
					></img>
				</div></span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNone />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Language />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Settings />
            </div>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </div>
        </div>
      </div>
    )
}
