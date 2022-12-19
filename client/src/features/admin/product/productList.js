import '../../../assets/styles/admin/productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import globalStateAndAction from '../../../container/global.state.action';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from '../../../utils/toast';

function ProductList() {
    const [dataProduct, setData] = useState(null);
    const [cookies] = useCookies();

    useEffect(() => {
        const getData = async () => {
            const endpoint = `${process.env.REACT_APP_API_URL}admin/products/getAllProduct`;

            const { data } = await axios.get(endpoint, {
                headers: {
                    authorization: 'Bearer ' + cookies.accessToken,
                },
            });
            setData(data.listDataCustom);
        };
        getData();
    }, [cookies.accessToken]);

    const handleDelete = async (id) => {
        const endpoint = `${process.env.REACT_APP_API_URL}admin/products/deleteProduct/${id}`;

        const res = await axios.delete(endpoint, {
            headers: {
                authorization: 'Bearer ' + cookies.accessToken,
            },
        });
        if (res.data.success === true) {
            setData(res.data.listDataCustom);
            Toast.fire({
                title: 'Xóa Thành Công',
                icon: 'success',
            });
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'nameProduct',
            headerName: 'Tên Sản Phẩm',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.image} alt="" />
                        {params.row.nameProduct}
                    </div>
                );
            },
        },
        { field: 'price', headerName: 'Giá', width: 200 },
        {
            field: 'collections',
            headerName: 'Loại',
            width: 120,
        },
        {
            field: 'sizeM',
            headerName: 'Size M',
            width: 160,
        },
        {
            field: 'sizeL',
            headerName: 'Size L',
            width: 160,
        },
        {
            field: 'sizeXL',
            headerName: 'Size XL',
            width: 160,
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={params.row.id}>
                            <button className="productListEdit">Sửa</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Link to="/admin/products/create">
                <button type="button" className="btn btn-primary mb-2">
                    Tạo Sản Phẩm
                </button>
            </Link>
            {dataProduct && (
                <DataGrid
                    rows={dataProduct}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                />
            )}
        </>
    );
}

export default globalStateAndAction(ProductList);
