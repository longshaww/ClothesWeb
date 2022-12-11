import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { Tabs } from 'antd';
import Review from './Review';
const RatingList = ({ reviewList }) => {
    const [listStar, setListStar] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    });

    const [argRate, setArgRate] = useState(Number(0));

    useEffect(() => {
        for (let item of reviewList) {
            setListStar((prev) => {
                return {
                    ...prev,
                    [item.rate]: Number(prev[item.rate]) + 1,
                };
            });
        }
        const sumRev = reviewList?.length || 0;
        const sumStar = reviewList.reduce((acc, curr) => {
            return (acc += Number(curr.rate));
        }, 0);

        sumRev > 0 && sumStar > 0 && setArgRate((sumStar / sumRev).toFixed(1));
    }, [reviewList]);

    return (
        <>
            <div className="pt-2 pl-6">
                <div>
                    <p className="stastic-star text-left">
                        <span className="star-product">{argRate}</span> trên 5
                    </p>

                    <Rating name="read-only" value={argRate} readOnly />
                </div>
                <div>
                    <Tabs
                        defaultActiveKey="1"
                        size={'small'}
                        style={{
                            marginBottom: 32,
                        }}
                        items={[
                            {
                                label: `Tất cả`,
                                key: `tabsall`,
                                children: <Review reviewList={reviewList || []} />,
                            },
                        ].concat(
                            Object.keys(listStar)
                                .reverse()
                                .map((key, index) => {
                                    return {
                                        label: `${key} sao (${listStar[key]})`,
                                        key: `tabs${key}`,
                                        children: (
                                            <Review
                                                reviewList={
                                                    reviewList.filter(
                                                        (item) => item.rate == 5 - index
                                                    ) || []
                                                }
                                            />
                                        ),
                                    };
                                })
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default RatingList;
