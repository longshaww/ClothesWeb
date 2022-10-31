import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../utils/toast';
import moment from 'moment';
import { isDate, checkIsValidName, validatePhoneNumber } from '../../utils/functionValidate';
import EditIcon from '@mui/icons-material/Edit';
import jwtDecode from 'jwt-decode';
import { Divider } from 'antd';

export default function FeedBack() {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'accessToken']);

    return (
        <>
            <div className="p-5">
                <div className=" text-center">
                    <span className="m-title"> ĐÁNH GIÁ SẢN PHẨM</span>
                </div>
                <Divider></Divider>
                <div className="row"></div>
            </div>
        </>
    );
}
