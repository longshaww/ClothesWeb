const User = require('../../models/UserWeb');
const moment = require('moment');
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
                res.status(404).json({
                    success: false,
                    msg: err.message,
                });
            });
    }

    async openBanUser(req, res, next) {
        await User.restore({ _id: req.params.id })
            .then((data) => {
                return getListUser(req, res, next);
            })
            .catch((err) => {
                res.status(404).json({
                    success: false,
                    msg: err.message,
                });
            });
    }

    async editUser(req, res, next) {
        try {
            const body = req.body;
        } catch (err) {
            throwErr(res, 404, err.message);
        }
    }

    async getDataUser(req, res, next) {
        try {
            const idUser = req.params.idUser;
            if (!idUser || idUser === '') throw new Error('NOT FOUND ID USER');
            const manageUserService = new ManageUserService(idUser);
            const dataUser = await manageUserService.getIdUser();
            if (!dataUser) throw new Error('DATA IS EMPTY ');
            return successRes(res, 200, dataUser, 'Success Get ID USER');
        } catch (err) {
            throwErr(res, 404, err.message);
        }
    }
}
module.exports = new UserAdminController();
