import { useState } from "react";
import axiosMethod from "../../middlewares/axios";
import "../../assets/styles/register.css";
export default function Register() {
  return (
    <>
      <div class="container-fluid mt-5">
        <div class="row">
          <div class="col-md-5 col-xs-12 wrapbox-heading-account">
            <div class="header-page clearfix">
              <h1>Tạo tài khoản</h1>
            </div>
          </div>
          <div class="col-md-2 col-xs-12 wrapbox-heading-account">
            <div class="vr"></div>
          </div>

          <div class="col-md-4 col-xs-12 wrapbox-content-account ">
            <div className="userbox">
              <form
                accept-charset="UTF-8"
                action="/account"
                id="create_customer"
                method="post"
              >
                <input name="form_type" type="hidden" value="create_customer" />
                <input name="utf8" type="hidden" value="✓" />

                <div id="form-last_name" class="clearfix large_form">
                  <label for="last_name" class="label icon-field">
                    <i class="icon-login icon-user "></i>
                  </label>
                  <input
                    required=""
                    type="text"
                    placeholder="Họ Tên "
                    id="last_name"
                    class="text"
                    size="30"
                  />
                </div>
                <div id="form-first_name" class="clearfix large_form">
                  <label for="first_name" class="label icon-field">
                    <i class="icon-login icon-user "></i>
                  </label>
                  <input
                    required=""
                    type="text"
                    name="customer[first_name]"
                    placeholder="Địa Chỉ"
                    id="first_name"
                    class="text"
                    size="30"
                  />
                </div>
                <div id="form-first_name" class="clearfix large_form">
                  <label for="first_name" class="label icon-field">
                    <i class="icon-login icon-user "></i>
                  </label>
                  <input
                    type="number"
                    placeholder="Số điện thoại"
                  />
                </div>
                <div id="form-gender" class="clearfix large_form">
                  <input
                    id="radio1"
                    type="radio"
                    value="0"
                    name="customer[gender]"
                  />
                  <label for="radio1">Nữ</label>
                  <input
                    id="radio2"
                    type="radio"
                    value="1"
                    name="customer[gender]"
                  />
                  <label for="radio2">Nam</label>
                </div>
                <div id="form-birthday" class="clearfix large_form">
                  <label for="birthday" class="label icon-field">
                    <i class="icon-login icon-envelope "></i>
                  </label>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    name="customer[birthday]"
                    id="birthday"
                    class="text"
                    size="30"
                  />
                </div>
                <div id="form-email" class="clearfix large_form">
                  <label for="email" class="label icon-field">
                    <i class="icon-login icon-envelope "></i>
                  </label>
                  <input
                    required=""
                    type="email"
                    placeholder="Email"
                    name="customer[email]"
                    id="email"
                    class="text"
                    size="30"
                  />
                </div>
                <div
                  id="form-password"
                  class="clearfix large_form large_form-mr10"
                >
                  <label for="password" class="label icon-field">
                    <i class="icon-login icon-shield "></i>
                  </label>
                  <input
                    required=""
                    type="password"
                    placeholder="Mật khẩu"
                    name="customer[password]"
                    id="password"
                    class="password text"
                    size="30"
                  />
                </div>
                <div class="clearfix large_form sitebox-recaptcha">
                  This site is protected by reCAPTCHA and the Google
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </div>
                <div class="d-flex justify-content-center">
            
                  <button type="button" class="btn btn-dark" style={{width:"100px;", height:"50px"}}>Đăng Ký</button>
             
                </div>
                <div class="clearfix req_pass ">
                  <a class="come-back" href="https://highclub.vn">
                    <i class="fa fa-long-arrow-left"></i> Quay lại trang chủ
                  </a>
                </div>

                <input
                  id="4cccc71233ec42179ffac3f5603bd6a6"
                  name="g-recaptcha-response"
                  type="hidden"
                  value="03AGdBq243-FgvuXuycaVql40BwwdNRFD17L68tYRqBrus0Ie0tmFWMzOwy91JN0y8ygCCdCjTS-AUuEjwO2Kn05OmILT90agk9yGEKiWjlcEfrvcNBxTilT-6j4Fqpf8lIZiCJ4g2T01BeOC0e5FHVlvX8M7ZSo8cedJsWdYxZAelckF77e13oUHvFhiWgvlDXIeCafbrDxBQJVUbnweK5ZLZVKYjAKjrbvw2iDeovk6b2mkecd-s7HFt-7u_Ptp8XC7PDkL7muGtjh-Mxudf58w-Zmhsa4DVFbrC1-R-eiLQsEd_mhwjslBqsjhvZGUGh2bJbqDpl20hQB1XEPKTY0Rd1yYB4FqDEcZfOm8GiRJgVTo44JaeHAYNVBMhQKnfaDj7L_pTDUa2KnIuilmCw2rIuqzHvOBqzj03ajyht4Ys3834xEEN4BktFl2dkWXdNLT9HgbeYph45huMFBEaYNtngtcyxQNcMJnNiyTxaNnHfVzn5urIvjvd65QhZ_IMALfvc058hsej"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
