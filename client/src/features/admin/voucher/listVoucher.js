import { DataGrid } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/admin/productList.css';
import axiosMethod from '../../../middlewares/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Toast from '../../../utils/toast';
import { deleteConfirm } from '../../../utils/delete.confirm';
import moment from 'moment';
import { useCookies } from 'react-cookie';

export default function ListVoucher() {
    const [listVoucher, setListVoucher] = useState([]);
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        async function getListVoucher() {
            const vouchers = await axiosMethod('admin/voucher', 'get', null, {
                authorization: 'Bearer ' + cookies.accessToken,
            });
            if (vouchers.success) {
                setListVoucher(vouchers.body);
            }
        }
        getListVoucher();
    }, []);

    const onDeleteVoucherClick = async (id) => {
        deleteConfirm('Đang xử lý', 'Chưa có gì xảy ra !', async () => {
            const findById = listVoucher.find((a) => a._id === id);
            const index = listVoucher.indexOf(findById);
            setListVoucher([...listVoucher.slice(0, index), ...listVoucher.slice(index + 1)]);
            const deleteVoucher = await axiosMethod(`admin/voucher/${id}`, 'delete', null, {
                authorization: 'Bearer ' + cookies.accessToken,
            });
            if (deleteVoucher.success) {
                Toast.fire({
                    title: 'Xóa voucher thành công',
                    icon: 'success',
                });
            }
        });
    };
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
            renderCell: (params) => {
                return <div>{params.row._id}</div>;
            },
        },
        { field: 'discount', headerName: 'Discount', width: 150 },
        {
            field: 'dateStart',
            headerName: 'Date Start',
            width: 200,
            renderCell: (params) => {
                return <div>{moment(params.row.dateStart).format('DD/MM/YYYY')}</div>;
            },
        },
        {
            field: 'dateEnd',
            headerName: 'Date End',
            width: 200,
            renderCell: (params) => {
                return <div>{moment(params.row.dateEnd).format('DD/MM/YYYY')}</div>;
            },
        },
        {
            field: 'maxDiscount',
            headerName: 'Max Discount',
            width: 160,
        },
        {
            field: 'qualifyAmount',
            headerName: 'Qualify Amount',
            width: 160,
        },
        {
            field: 'qty',
            headerName: 'Qty',
            width: 160,
        },
        {
            headerName: 'Action',
            field: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="d-flex">
                        <Link to={`${params.row._id}`} className="me-3">
                            <RemoveRedEyeIcon />
                        </Link>
                        <Link to={`edit/${params.row._id}`}>
                            <EditIcon />
                        </Link>
                        <button
                            className="btn"
                            onClick={() => onDeleteVoucherClick(params.row._id)}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Link to="create" className="btn btn-primary ms-2 mb-2">
                Tạo voucher
            </Link>
            <DataGrid
                rows={listVoucher}
                disableSelectionOnClick
                columns={columns}
                pageSize={9}
                getRowId={(row) => row._id}
            />
        </>
    );
}
