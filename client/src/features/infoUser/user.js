import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SideBarUser from "./sideBar";
import Moment from "react-moment";
import "../../assets/styles/userInfo.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Toast from "../../utils/toast";
import moment from "moment";
import {
  isDate,
  checkIsValidName,
  validatePhoneNumber,
} from "../../utils/functionValidate";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const radio = [
  {
    value: true,
    name: "Nam",
  },
  { value: false, name: "Nữ" },
];

export default function User() {
  const [data, setData] = useState(null);
  const [checkedGender, setCheckedGender] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "accessToken",
  ]);
  const [inputs, setInputs] = useState({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: true,
    address: "",
  });
  const validate = () => {
    if (
      inputs.name === "" ||
      inputs.dateOfBirth === "" ||
      inputs.address === "" ||
      inputs.phoneNumber === ""
    ) {
      Toast.fire({
        title: "Vui Lòng Nhập Đầy Đủ Thông Tin",
        icon: "error",
      });
      return false;
    }
    if (!isDate(inputs.dateOfBirth)) {
      Toast.fire({
        title: "Nhập Sai Ngày Sinh",
        icon: "error",
      });
      return false;
    }
    if (checkIsValidName(inputs.name)) {
      Toast.fire({
        title: "Nhập Sai Tên",
        icon: "error",
      });
      return false;
    }
    if (!validatePhoneNumber(inputs.phoneNumber)) {
      Toast.fire({
        title: "Nhập Sai Số",
        icon: "error",
      });
      return false;
    }

    return true;
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}user/getUser/${cookies.user.id}`,
          {
            headers: {
              authorization: "Bearer " + cookies.accessToken,
            },
          }
        );
        const customData = {
          name: data.user.information.name,
          phoneNumber: data.user.information.phoneNumber,
          dateOfBirth: moment(data.user.information.dateOfBirth).format("MM/DD/YYYY"),
          gender: data.user.information.gender,
          address: data.user.information.address,
          email : data.user.email
        };
        await setData(customData);
        await setInputs(customData);
        await setCheckedGender(customData.gender);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  const handleChange = (event) => {
    const value = event.target.value;
    setInputs({
      ...inputs,
      [event.target.name]: value,
    });
  };
  const handleEditUser = async () => {
    if (validate()) {
      try {
        const dataCustom = {
          ...inputs,
          gender: checkedGender,
        };
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}user/editUser/${cookies.user.id}`, dataCustom,
          {
            headers: {
              authorization: "Bearer " + cookies.accessToken,
            },
          }
        );
        if (data.success === true) {
          const info = await jwtDecode(data.accessToken);
          setCookie("user", info, { path: "/" });
          setCookie("accessToken", data.accessToken, {
            path: "/",
          });
          const customData = {
            name: info.information.name,
            phoneNumber: info.information.phoneNumber,
            dateOfBirth: moment(info.information.dateOfBirth).format("MM/DD/YYYY"),
            gender: info.information.gender,
            address: info.information.address,
            email : info.email
          };
          await setData(customData);
          await setInputs(customData);
          await setCheckedGender(customData.gender);
          Toast.fire({
            title: "Sữa Thông Tin Thành Công",
            icon: "success",
          });
        }
      } catch (err) {
        Toast.fire({
          title: "Đã xảy ra lỗi",
          icon: "error",
        });
      }
    }
  }
  return (
    <>
      {data !== null ? (
        <div class="mainContent-theme ">
          <div class="layout-info-account">
            <div class="title-infor-account text-center mt-5">
              <h1>Tài khoản của bạn </h1>
            </div>

            <div class="container mt-5">
              <div class="row">
                <SideBarUser />
                <div class="col-xs-12 col-sm-9">
                  <div class="row">
                    <div class="col-xs-12" id="customer_sidebar">
                      <h5 class="title-detail">Thông tin tài khoản</h5>
                      <div>
                        <h2 class="name_account">
                          Tên : {data.name}
                        </h2>
                        <div class="email">Email : {data.email}</div>
                        <div class="email">SĐT : 2031223</div>
                        <div class="email">
                          Giới Tính :{" "}
                          {data.gender ? (
                            <span>Nam</span>
                          ) : (
                            <span>Nữ</span>
                          )}
                        </div>
                        Sinh Năm:{" "}
                        <Moment format="DD/MM/YYYY" class="email">
                          {data.dateOfBirth}
                        </Moment>
                        <div class="email">
                          {" "}
                          Địa Chỉ : {data.address}
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-xs-12 customer-table-wrap"
                      id="customer_orders"
                    >
                      <div class="customer_order customer-table-bg ">
                        <div className="text-center">
                          <h5>
                            <a href="#!">Sữa Thông Tin</a>
                          </h5>
                        </div>
                        <div>
                          <form>
                            <div
                              class="text-center mt-3 "
                              style={{ width: "500px", marginLeft: "250px" }}
                            >
                              <input
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput"
                                name="name"
                                value={inputs.name}
                                onChange={handleChange}
                                placeholder="Tên"
                              />
                            </div>
                            <div
                              class="form-group mt-3"
                              style={{ width: "500px", marginLeft: "250px" }}
                            >
                              <input
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput2"
                                name="phoneNumber"
                                value={inputs.phoneNumber}
                                maxLength="10"
                                onChange={handleChange}
                                placeholder="SĐT"
                              />
                            </div>
                            <div
                              className="d-flex mt-2"
                              style={{ marginLeft: "250px" }}
                            >
                              {radio.map((el, index) => {
                                return (
                                  <>
                                    <input
                                      type="radio"
                                      name="gender"
                                      style={{ marginLeft: "10px" }}
                                      onChange={() =>
                                        setCheckedGender(el.value)
                                      }
                                      checked={checkedGender === el.value}
                                    />
                                    <label htmlFor="genderData">
                                      {el.name}
                                    </label>
                                  </>
                                );
                              })}
                            </div>

                            <div
                              class="form-group mt-3"
                              style={{ width: "500px", marginLeft: "250px" }}
                            >
                              <input
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Ngày Sinh"
                                name="dateOfBirth"
                                value={inputs.dateOfBirth}
                              />
                            </div>
                            <div
                              class="form-group mt-3"
                              style={{ width: "500px", marginLeft: "250px" }}
                            >
                              <input
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput2"
                                name="address"
                                value={inputs.address}
                                onChange={handleChange}
                                placeholder="Địa Chỉ"
                              />
                            </div>
                          </form>
                          <div className="text-center mt-2">
                            <button class="btn btn-primary" onClick={handleEditUser}>Sữa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
