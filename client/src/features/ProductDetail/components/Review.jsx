import React from 'react';
import { Avatar, Rating } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
const Review = ({ rate, reviewList }) => {
    return (
        <ul>
            {reviewList.map((reviewItem, index) => {
                return (
                    <li key={`rv${index}`}>
                        <div className="mt-1 p-4">
                            {/* <div>Người đánh giá: {item.userID}</div> */}
                            <div className="top-rate d-flex">
                                <div className="avt-rate">
                                    {reviewItem?.userID?.information?.name && (
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[500],
                                                width: 24,
                                                height: 24,
                                            }}
                                        >
                                            {reviewItem?.userID?.information?.name[0]}
                                        </Avatar>
                                    )}
                                </div>
                                <div className="body-rate pl-2">
                                    <p className="user-rate">
                                        {reviewItem?.userID?.information?.name
                                            ? reviewItem?.userID?.information?.name
                                            : 'Người dùng đã bị chặn'}
                                    </p>
                                    <p className="content-rate">{reviewItem?.content}</p>
                                </div>
                            </div>
                            <div className="pl-6 star-rate">
                                <Rating name="read-only" value={reviewItem?.rate} readOnly />
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Review;
