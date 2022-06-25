import "../../../assets/styles/admin/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import Toast from '../../../utils/toast';
import InfoIcon from '@mui/icons-material/Info';
export default function ListBill() {

  const [data, setData] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    const getData = async () => {
      const endpoint = `${process.env.REACT_APP_API_URL}admin/bills/getAllBill`

      const { data } = await axios.get(endpoint,
        {
          headers: {
            authorization:
              "Bearer " + cookies.accessToken,
          },
        });

      setData(data.listBillCustom);

    };
    getData();

  }, [data, cookies.accessToken]);

  const renderVerify = (status, id) => {
    if (status === false) {
      return (
        <>
          <button className="productListEdit" value={id} onClick={handleVerifyBill}>Xác Nhận</button>
        </>
      )
    }

  }
  const handleVerifyBill = async (e) => {
    try {
      const endpoint = `${process.env.REACT_APP_API_URL}admin/bills//update-bill/${e.target.value}`
       
      const res = await axios.put(endpoint,{status : true} ,
        {
          headers: {
            authorization:
              "Bearer " + cookies.accessToken,
          },
        });
      if (res.data.success === true) {
        Toast.fire({
          title: "Xác Nhận Thành Công",
          icon: "success",
        });
      }
    }
    catch (err) {
      Toast.fire({
        title: "Đã xảy ra lỗi",
        icon: "error",
      });
    }

  }
  const handleDelete = async (id) => {
    const endpoint = `${process.env.REACT_APP_API_URL}admin/products/deleteProduct/${id}`

    const res = await axios.delete(endpoint,
      {
        headers: {
          authorization:
            "Bearer " + cookies.accessToken,
        },
      });
    if (res.data.success === true) {
      Toast.fire({
        title: "Xóa Thành Công",
        icon: "success",
      });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "qtyProduct",
      headerName: "Số Lượng",
      width: 150,
    },
    {
      field: "total",
      headerName: "Tổng Tiền",
      width: 160,
    },
    {
      field: "paymentMethod",
      headerName: "Thanh Toán",
      width: 160,
    },
    {
      field: "createdAt",
      headerName: "Ngày Tạo",
      width: 160,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {renderVerify(params.row.status, params.row.id)}
            <InfoIcon
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}