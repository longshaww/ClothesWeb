import React from 'react';
import { Avatar, Rating } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

import axiosMethod from '../../../../middlewares/axios';
import { useCookies } from 'react-cookie';
import Toast from '../../../../utils/toast';
import axios from 'axios';
const RatingList = ({ ratings, item, setLoading, getData }) => {
    const [cookies] = useCookies(['accessToken']);
    function handleDeleteRate(idRate) {
        setLoading(true);
        const endpoint = `admin/rate/${idRate}`;
        const response = axiosMethod(endpoint, 'DELETE', null, {
            authorization: 'Bearer ' + cookies.accessToken,
        });

        response
            .then((res) => {
                getData();
                setLoading(false);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                setLoading(true);
            });
    }

    return (
        <ul className="list-rate ">
            {ratings[item].map((item) => {
                return (
                    <li>
                        <div className="mt-1 p-4">
                            {/* <div>Người đánh giá: {item.userID}</div> */}
                            <div className="top-rate d-flex">
                                <div className="avt-rate">
                                    {item.fullname && (
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[500],
                                                width: 24,
                                                height: 24,
                                            }}
                                        >
                                            {item.fullname[0]}
                                        </Avatar>
                                    )}
                                </div>
                                <div className="body-rate pl-2">
                                    <p className="user-rate">
                                        {item.fullname ? item?.fullname : 'Người dùng đã bị chặn'}
                                    </p>
                                    <p className="content-rate">{item?.content}</p>
                                </div>
                            </div>
                            <div className="pl-6 star-rate">
                                <Rating name="read-only" value={item?.rate} readOnly />
                            </div>
                            <div className="action-rate mt-3 d-flex">
                                <button
                                    onClick={() => handleDeleteRate(item?.idRate)}
                                    className="btn btn-warning ml-2"
                                >
                                    Xóa đánh giá
                                </button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default RatingList;
