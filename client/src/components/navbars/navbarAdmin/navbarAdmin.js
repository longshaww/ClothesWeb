import { NotificationsNone, Language } from "@material-ui/icons";
import "../../../assets/styles/admin/narbaradmin.css";
import Logo from "../../../assets/images/hyperX.jpeg";

import Auth from "../../auth/auth";

import {Link} from "react-router-dom"
export default function NavbarAppAdmin() {
 
	return (
        <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo"><div id="center-logo" className="mt-4">
          <Link to="/">
          <img
						id="logo"
						src={Logo}
						alt=""
						className="logo-Img"
					></img>
          </Link>
					
				</div></span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNone />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer" >
                   
         
            </div>
            <Auth/>

          </div>
        </div>
      </div>
    )
}
