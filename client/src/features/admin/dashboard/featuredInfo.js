import '../../../assets/styles/admin/featuredInfo.css';
import globalStateAndAction from '../../../container/global.state.action';
import { useState } from 'react';
import { useEffect } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

function FeaturedInfo({ listDashBoard }) {
    const [infoQty, setInfoQty] = useState({
        qtyProduct: 0,
        qtyBill: 0,
        qtyUser: 0,
    });
    const [filter, setFilter] = useState({
        startDate: new Date(),
        endDate: new Date(),
        billState: 'SUCCESSFUL_DELIVERY_CONFIRMATION',
        paymentMethod: 'COD',
    });

    useEffect(() => {
        setInfoQty(() => ({
            qtyProduct: listDashBoard.qtyProduct,
            qtyBill: listDashBoard.qtyBill,
            qtyUser: listDashBoard.qtyUser,
        }));
    }, [listDashBoard]);

    const paymentMethodOptions = [
        {
            value: 'COD',
            label: 'Thanh toán khi nhận hàng',
        },
        {
            value: 'Online',
            label: 'Thanh toán trực tuyến',
        },
    ];
    const billStateOptions = [
        {
            value: 'PENDING',
            label: 'Chưa duyệt',
        },
        {
            value: 'DELIVERY',
            label: 'Đang giao',
        },
        {
            value: 'SUCCESSFUL_DELIVERY_CONFIRMATION',
            label: 'Đã giao',
        },
        {
            value: 'FAILED_DELIVERY_CONFIRMATION',
            label: 'Giao thất bại',
        },
        {
            value: 'FAILED_DELIVERY_CONFIRMATION',
            label: 'Giao thất bại',
        },
        {
            value: 'CANCEL_BILL',
            label: 'Hủy đơn',
        },
    ];
    return (
        <>
            <Box p={5} sx={{ boxShadow: 1, borderRadius: 1 }}>
                <Stack spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel id="billState">Lọc theo trạng thái</InputLabel>
                        <Select
                            labelId="billState"
                            id="billState"
                            value={filter.billState}
                            label="Lọc theo trạng thái"
                            onChange={(e) => setFilter({ ...filter, billState: e.target.value })}
                        >
                            {billStateOptions.map((state) => (
                                <MenuItem value={state.value}>{state.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="paymentMethod">Hình thức thanh toán</InputLabel>
                        <Select
                            labelId="paymentMethod"
                            id="paymentMethod"
                            value={filter.paymentMethod}
                            label="Hình thức thanh toán"
                            onChange={(e) =>
                                setFilter({ ...filter, paymentMethod: e.target.value })
                            }
                        >
                            {paymentMethodOptions.map((payment) => (
                                <MenuItem value={payment.value}>{payment.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 3,
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày bắt đầu"
                                inputFormat="DD/MM/YYYY"
                                value={filter.startDate}
                                // onChange={handleDateEndChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Ngày kết thúc"
                                inputFormat="DD/MM/YYYY"
                                value={filter.endDate}
                                // onChange={handleDateEndChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Stack>
            </Box>
            <Box>
                <Grid container spacing={3}>
                    <Grid xs={4}>
                        <Box p={5} sx={{ borderRadius: 1, boxShadow: 1 }}>
                            <Stack spacing={1}>
                                <Typography fontSize={22}>Tổng sản phẩm</Typography>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {infoQty.qtyProduct}
                                </Typography>
                                <Typography variant="subtitle1">SẢN PHẨM</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box p={5} sx={{ borderRadius: 1, boxShadow: 1 }}>
                            <Stack spacing={1}>
                                <Typography fontSize={22}>Tổng sản phẩm</Typography>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {infoQty.qtyProduct}
                                </Typography>
                                <Typography variant="subtitle1">SẢN PHẨM</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box p={5} sx={{ borderRadius: 1, boxShadow: 1 }}>
                            <Stack spacing={1}>
                                <Typography fontSize={22}>Tổng sản phẩm</Typography>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {infoQty.qtyProduct}
                                </Typography>
                                <Typography variant="subtitle1">SẢN PHẨM</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default globalStateAndAction(FeaturedInfo);
