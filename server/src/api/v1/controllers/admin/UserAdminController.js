const { User } = require('../../models/index');
const { getListUser } = require('../../utils/service');
const { throwErr, successRes } = require('../../utils/HandleResponse');
const ManageUserService = require('../../services/admin/manageUser/index');
class UserAdminController {
    async getAllUser(req, res, next) {
        return getListUser(req, res, next);
    }

    async banUser(req, res, next) {
        User.delete({ _id: req.params.id })
            .then((data) => {
                return getListUser(req, res, next);
            })
            .catch((err) => {
                throwErr(res, 500, err.message);
            });
    }

    async openBanUser(req, res, next) {
        await User.restore({ _id: req.params.id })
            .then((data) => {
                return getListUser(req, res, next);
            })
            .catch((err) => {
                throwErr(res, 500, err.message);
            });
    }

    async editMngUser(req, res, next) {
        try {
            const { _id, isAdmin, role, myPoint, vip, moneyPayed, deleted } = req.body;
            const { name, phoneNumber, dateOfBirth, gender, address } = req.body.information;
            if (
                !_id ||
                isAdmin === '' ||
                isNaN(role) ||
                isNaN(myPoint) ||
                !vip ||
                isNaN(moneyPayed) ||
                deleted === ''
            ) {
                throw new Error('Error Request');
            }
            if (!name || !phoneNumber || !dateOfBirth || gender === '' || !address) {
                throw new Error('Error Request');
            }
            const idUser = _id;
            const manageUserService = new ManageUserService(idUser);
            const data = await manageUserService.editUser(req.body);
            return await successRes(res, 200, data, 'Update Success');
        } catch (err) {
            return throwErr(res, 500, err.message);
        }
    }

    async getDataUser(req, res, next) {
        try {
            const idUser = req.params.idUser;
            if (!idUser || idUser === '') throw new Error('NOT FOUND ID USER');
            const manageUserService = new ManageUserService(idUser);
            const dataUser = await manageUserService.getIdUser();
            if (!dataUser) throw new Error('DATA IS EMPTY');
            return successRes(res, 200, dataUser, 'Success Get ID USER');
        } catch (err) {
            return throwErr(res, 500, err.message);
        }
    }

    async changePasswordUser(req, res, next) {
        const { _id, password } = req.body;
        try {
            if (!_id || _id === '' || !password || password === '') {
                throw new Error('Request Error: Invalid');
            }
            const manageUserService = new ManageUserService(_id);
            const dataUser = await manageUserService.changePassword(password);
            if (!dataUser) throw new Error('Data is err');
            return successRes(res, 200, null, 'Successfully ChangePassword');
        } catch (err) {
            return throwErr(res, 500, err.message);
        }
    }
}
module.exports = new UserAdminController();
