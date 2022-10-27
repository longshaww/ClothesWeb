import '../../../../assets/styles/admin/user.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import InfoUser from './infoUser';
import ActionUser from './actionUser';
export default function EditUser() {
    let { id } = useParams();

    const [dataDetail, setDataDetail] = useState(null);
    const [cookies] = useCookies();

    useEffect(() => {
        const getData = async () => {
            const endpoint = `${process.env.REACT_APP_API_URL}admin/users/getDataUser/${id}`;

            const { data } = await axios.get(endpoint, {
                headers: {
                    authorization: 'Bearer ' + cookies.accessToken,
                },
            });
            setDataDetail(data.body);
        };
        getData();
    }, []);

    const renderProduct = () => {
        if (dataDetail !== null) {
            return (
                <>
                    <div className="userContainer">
                        <InfoUser
                            infoUser={dataDetail}
                            idUser={id}
                            accessToken={cookies.accessToken}
                            setDataDetail={setDataDetail}
                        />
                        <ActionUser
                            infoUser={dataDetail}
                            idUser={id}
                            accessToken={cookies.accessToken}
                            setDataDetail={setDataDetail}
                        />
                    </div>
                </>
            );
        }
    };
    return (
        <>
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Chi Tiết Người dùng</h1>
                </div>
                {renderProduct()}
            </div>
        </>
    );
}
