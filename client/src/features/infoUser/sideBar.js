import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
export default function SideBarUser()
{
    return (<>
          <div class="col-xs-12 col-sm-3 sidebar-account">
                <div class="AccountSidebar">
                  <h3 class="AccountTitle titleSidebar">Tài khoản</h3>
                  <div class="AccountContent">
                    <div class="AccountList">
                      <ul class="list-unstyled mt-3">
                        <li class="current">
                           
                          <a href="/account"> <label> <PermIdentityRoundedIcon/></label> Thông tin tài khoản</a>
                        </li>
                        <li className="mt-3">
                          <a href="/account/addresses"><label><BusinessRoundedIcon/></label> Danh sách địa chỉ</a>
                        </li>
                        <li class="last mt-3">
                          <a href="/account/logout">Đăng xuất</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
    </>)
}