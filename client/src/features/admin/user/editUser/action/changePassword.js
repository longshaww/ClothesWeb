import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';
import axios from 'axios';
import Toast from '../../../../../utils/toast';
import { useEffect, useState } from 'react';
import { validatePassword } from '../../../../../utils/functionValidate';
export default function ChangePasswordUser({ idUser, accessToken, setDataDetail }) {
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(true);
    useEffect(() => {
        if (password.length > 6) {
            return setDisable(false);
        }
        return setDisable(true);
    });
    const handleChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (!validatePassword(password))
                throw new Error('Tăng Độ Bảo Mật Cho Tài Khoản, ( > 6 kí tự)');
            const endpoint = `${process.env.REACT_APP_API_URL}admin/users/changePasswordUser`;
            const model = {
                password,
                _id: idUser,
            };
            const { data } = await axios.put(endpoint, model, {
                headers: {
                    authorization: 'Bearer ' + accessToken,
                },
            });
            if (data.success) {
                resetState();
                return Toast.fire({
                    title: 'Đổi Mật Khẩu Thành Công',
                    icon: 'success',
                });
            }
        } catch (err) {
            resetState();
            return Toast.fire({
                title: err.message,
                icon: 'error',
            });
        }
    };
    const resetState = () => {
        setPassword('');
        setDisable(false);
    };
    return (
        <>
            <div className="newUserForm">
                <div className="newUserItem">
                    <label>Mật Khẩu Mới</label>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Input.Password
                            style={{ width: '100%' }}
                            value={password}
                            onChange={handleChange}
                        />
                    </Space>
                </div>
            </div>
            <div className="text-center mt-3">
                <button
                    type="button"
                    className="btn btn-success"
                    disabled={disable}
                    onClick={handleClick}
                >
                    Đổi mật khẩu
                </button>
            </div>
        </>
    );
}
