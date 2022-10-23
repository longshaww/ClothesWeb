import { useState, useEffect } from 'react';
export default function ChangePassword() {
    const [password, setPassword] = useState({
        oldPassword: {
            showOldPassword: false,
            valueOldPassword: '',
        },
        newPassword: {
            showNewPassword: false,
            valueNewPassword: '',
        },
        verifyPassword: {
            showNewPassword: false,
            valueOldPassword: '',
        },
    });
    return (
        <div className="p-5 shadow">
            <div className="row mb-3">
                <div>
                    <h1> Thêm mật khẩu </h1>
                    <div class="tk-R8Z">
                        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                    </div>
                </div>
            </div>
            <hr />
            <div className="row justify-content-center">
                <div className="col-sm-8 mt-4">
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-3 col-form-label">
                            Mật Khẩu Cũ
                        </label>
                        <div class="col-sm-9">
                            <input
                                type={password.oldPassword.showOldPassword ? 'text' : 'password'}
                                class="form-control form-control-md"
                                id="inputPassword"
                            />
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="inputPassword" class="col-sm-3 col-form-label">
                            Mật Khẩu Mới
                        </label>
                        <div class="col-sm-9">
                            <input
                                type={password.newPassword.showNewPassword ? 'text' : 'password'}
                                class="form-control form-control-md"
                                id="inputPassword"
                            />
                        </div>
                    </div>
                    <div class="form-group row mt-3">
                        <label for="inputPassword" class="col-sm-3">
                            Xác Nhận Lại Mật Khẩu
                        </label>
                        <div class="col-sm-9">
                            <input
                                type={password.verifyPassword.showVerifyPassword ? 'text' : 'password'}
                                class="form-control form-control-md"
                                id="inputPassword"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3">
                <button class="btn btn-dark">Đổi Mật Khẩu</button>
            </div>
        </div>
    );
}
