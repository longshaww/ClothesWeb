import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Box, TextField } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { validateVoucher } from '../../../utils/validate.voucher';
import Toast from '../../../utils/toast';
import axiosMethod from '../../../middlewares/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function EditVoucher() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies] = useCookies(['accessToken']);

    const [inputs, setInputs] = useState({
        discount: '',
        dateStart: moment(new Date()).format('YYYY/MM/DD'),
        dateEnd: moment().add('1', 'days').format('YYYY/MM/DD'),
        maxDiscount: '',
        qualifyAmount: '',
        qty: '',
    });
    useEffect(() => {
        async function getVoucher() {
            const voucher = await axiosMethod(`admin/voucher/${id}`, 'get', null, {
                authorization: 'Bearer ' + cookies.accessToken,
            });
            if (voucher.success) {
                setInputs(voucher.body);
            }
        }
        getVoucher();
    }, [id]);
    const handleDateStartChange = (newValue) => {
        setInputs({
            ...inputs,
            dateStart: moment(newValue).format('YYYY/MM/DD'),
        });
    };
    const handleDateEndChange = (newValue) => {
        setInputs({
            ...inputs,
            dateEnd: moment(newValue).format('YYYY/MM/DD'),
        });
    };
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateVoucher(inputs)) {
            const newVoucher = await axiosMethod(`admin/voucher/${id}`, 'put', inputs, {
                authorization: 'Bearer ' + cookies.accessToken,
            });
            if (newVoucher.success) {
                Toast.fire({
                    title: 'Sửa voucher thành công',
                    icon: 'success',
                });
                navigate('/admin/vouchers');
            }
        }
    };

    return (
        <div style={{ flex: 4 }} className="p-5 shadow mx-3">
            <h3 className="mb-3">Sửa voucher</h3>
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 3 }}>
                    <TextField
                        id="outlined-basic"
                        label="Phần trăm giảm"
                        onChange={handleInputChange}
                        value={inputs.discount}
                        name="discount"
                        variant="outlined"
                        fullWidth
                        type="number"
                    />
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 3,
                        marginBottom: 3,
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Ngày bắt đầu"
                            inputFormat="DD/MM/YYYY"
                            value={inputs.dateStart}
                            onChange={handleDateStartChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Ngày kết thúc"
                            inputFormat="DD/MM/YYYY"
                            value={inputs.dateEnd}
                            onChange={handleDateEndChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ marginBottom: 3 }}>
                    <TextField
                        id="outlined-basic"
                        label="Số tiền giảm tối đa"
                        onChange={handleInputChange}
                        value={inputs.maxDiscount}
                        name="maxDiscount"
                        variant="outlined"
                        fullWidth
                        type="number"
                    />
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                >
                    <Box sx={{ marginRight: 2 }}>
                        <TextField
                            id="outlined-basic"
                            label="Số tiền thỏa mãn điều kiện"
                            onChange={handleInputChange}
                            value={inputs.qualifyAmount}
                            name="qualifyAmount"
                            variant="outlined"
                            fullWidth
                            type="number"
                        />
                    </Box>
                    <TextField
                        id="outlined-basic"
                        label="Số lượng"
                        onChange={handleInputChange}
                        value={inputs.qty}
                        name="qty"
                        variant="outlined"
                        type="number"
                    />
                </Box>
                <div className="text-center mt-5">
                    <button className="btn btn-primary">Edit</button>
                </div>
            </form>
        </div>
    );
}
