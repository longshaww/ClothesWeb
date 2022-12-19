import { useState } from 'react';
import Toast from '../../../../utils/toast';
import moment from 'moment';
import axios from 'axios';
import { Tabs } from 'antd';
import EditInfoUser from './action/editInfoUser';
import ChangePasswordUser from './action/changePassword';
export default function ActionUser({ infoUser, idUser, accessToken, setDataDetail }) {
    return (
        <>
            <div className="p-2 shadow mx-3" style={{ flex: 1 }}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Sửa Thông Tin" key="1">
                        <EditInfoUser
                            infoUser={infoUser}
                            idUser={idUser}
                            accessToken={accessToken}
                            setDataDetail={setDataDetail}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đổi Mật Khẩu" key="2">
                        <ChangePasswordUser
                            idUser={idUser}
                            accessToken={accessToken}
                            setDataDetail={setDataDetail}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>
    );
}
