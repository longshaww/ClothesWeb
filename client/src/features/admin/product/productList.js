import "../../../assets/styles/admin/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../dashboard/dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import globalStateAndAction from '../../../container/global.state.action';
import axios from 'axios';
import { useCookies } from "react-cookie";

 function ProductList() {
  
  const [data, setData] = useState([]);
  const [cookies] = useCookies();
  const getData = async () => {
    const endpoint = `${process.env.REACT_APP_API_URL}admin/products/getAllProduct`

		const { data } = await axios.get(endpoint,
			{
				headers: {
					authorization:
						"Bearer " + cookies.accessToken,
				},
			});
      
      setData(data.listDataCustom);
	};
	useEffect(() => {
		getData();

	}, [data]);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nameProduct",
      headerName: "Tên Sản Phẩm",
      width: 200,
      renderCell: (params) => {
        console.log(params)
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.nameProduct}
          </div>
        );
      },
    },
    { field: "price", headerName: "Giá", width: 200 },
    {
      field: "collections",
      headerName: "Loại",
      width: 120,
    },
    {
      field: "sizeM",
      headerName: "Size M",
      width: 160,
    },
    {
      field: "sizeL",
      headerName: "Size L",
      width: 160,
    },
    {
      field: "sizeXL",
      headerName: "Size XL",
      width: 160,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
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
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default globalStateAndAction(ProductList)
