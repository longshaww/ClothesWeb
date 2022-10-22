import { useState, useEffect } from 'react';

import { useCookies } from 'react-cookie';
import BillComponent from './bill.component';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, a11yProps } from '../Tab';
import EmptyBill from './emptyBill';
import {
    cancelBill,
    deliveryBill,
    pendingBill,
    successFulDeliveryConfirmation,
} from '../../constants/constants';
export default function BillMe() {
    const [listBill, setListBill] = useState(null);
    const [cookies] = useCookies(['user,accessToken']);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        async function getListBillMe() {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}user/getBillUser/${cookies.user.id}`,
                {
                    headers: {
                        authorization: 'Bearer ' + cookies.accessToken,
                    },
                }
            );
            if (data.success) {
                setListBill(data.listBill);
            }
        }
        getListBillMe();
    }, []);
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="bill state" centered>
                        <Tab label="Chờ xác nhận" {...a11yProps(0)} />
                        <Tab label="Đang giao" {...a11yProps(1)} />
                        <Tab label="Đã giao" {...a11yProps(3)} />
                        <Tab label="Đã hủy" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {listBill?.length > 0 ? (
                        listBill?.map((el) => {
                            if (el.status === pendingBill) {
                                return <BillComponent bill={el} />;
                            }
                        })
                    ) : (
                        <EmptyBill />
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {listBill?.length > 0 ? (
                        listBill?.map((el) => {
                            if (el.status === deliveryBill) {
                                return <BillComponent bill={el} />;
                            }
                        })
                    ) : (
                        <EmptyBill />
                    )}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {listBill?.length > 0 ? (
                        listBill?.map((el) => {
                            if (el.status === successFulDeliveryConfirmation) {
                                return <BillComponent bill={el} />;
                            }
                        })
                    ) : (
                        <EmptyBill />
                    )}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {listBill?.length > 0 ? (
                        listBill?.map((el) => {
                            if (el.status === cancelBill) {
                                return <BillComponent bill={el} />;
                            }
                        })
                    ) : (
                        <EmptyBill />
                    )}
                </TabPanel>
            </Box>
        </>
    );
}
