import PaidIcon from '@mui/icons-material/Paid';
import { Collapse } from 'react-collapse';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Moment from 'react-moment';
import { rankedUser } from '../../../../utils/returnHTML';
export default function ActionUser({ infoUser, idUser, accessToken, setDataDetail }) {
    const dateOfBirth = infoUser.information.dateOfBirth;
    const ranked = rankedUser(infoUser.moneyPayed);
    return (
        <>
            <div className="userShow">
                <div className="userShowTop">
                    <img
                        src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
                        alt=""
                        className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                        <h3 className="user-nameUser">{infoUser.information.name}</h3>
                        <div>
                            {infoUser.moneyPayed !== 0
                                ? infoUser.moneyPayed.toLocaleString() + ',000'
                                : 0}{' '}
                            đ{' '}
                        </div>

                        <div className="user-heading">
                            <span style={{ color: `${ranked.color}` }}>
                                {ranked.title}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="userShowBottom">
                    <span className="userShowTitle">Thông Tin</span>
                    <div className="userShowInfo mt-3">
                        <span className="userShowTitle">Điện Thoại :</span>
                        <span className="userShowInfoTitle">
                            {infoUser.information.phoneNumber}
                        </span>
                    </div>
                    <div className="userShowInfo mt-3">
                        <span className="userShowTitle">Ngày Sinh :</span>
                        <Moment className="userShowInfoTitle" format="DD/MM/YYYY">
                            {dateOfBirth}
                        </Moment>{' '}
                    </div>
                    <div className="userShowInfo mt-3">
                        <span className="userShowTitle">Giới Tính :</span>
                        <span className="userShowInfoTitle">
                            {infoUser.information.gender ? 'Nam' : 'Nữ'}
                        </span>
                    </div>
                    <div className="userShowInfo mt-3">
                        <span className="userShowTitle">Địa Chỉ :</span>
                        <span className="userShowInfoTitle">{infoUser.information.address}</span>
                    </div>
                    <div className="userShowInfo mt-3">
                        <span className="userShowTitle">Bộ Phận :</span>
                        <span className="userShowInfoTitle">
                            {infoUser.role === 0 ? 'Khách Hàng' : 'Nhân Viên'}
                        </span>
                    </div>
                    <div className="userShowInfo mt-3">
                        <span className="userShowTitle">Trạng Thái :</span>
                        <span className="userShowInfoTitle">
                            {infoUser.deleted ? 'Bị Chặn' : 'Hoạt Động'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
