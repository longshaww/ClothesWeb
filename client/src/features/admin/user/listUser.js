import "../../../assets/styles/admin/userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
export default function ListUser() {
  const [data, setData] = useState([]);
  const [cookies] = useCookies();
  const getData = async () => {
    const endpoint = `${process.env.REACT_APP_API_URL}admin/users/getAllUser`

		const { data } = await axios.get(endpoint,
			{
				headers: {
					authorization:
						"Bearer " + cookies.accessToken,
				},
			});
      
      setData(data.listUserCustom);
	};
	useEffect(() => {
		getData();

	}, [data]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 210 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=" alt="" />
            {params.row.email}
          </div>
        );
      },
    },
    { field: "name", headerName: "Tên", width: 200 },
    {
      field: "phone",
      headerName: "Điện Thoại",
      width: 170,
    },
    {
      field: "dateOfBirth",
      headerName: "Ngày Sinh",
      width: 160,
    },
    {
      field: "point",
      headerName: "Điểm",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={9}
        checkboxSelection
      />
    </div>
  );
}
