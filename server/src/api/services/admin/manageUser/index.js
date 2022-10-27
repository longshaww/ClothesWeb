const UserWeb = require('../../../models/UserWeb');
class ManageUserService {
    constructor(id) {
        this._idUser = id;
    }

    async editUser() {}

    async getIdUser() {
        try {
            const data = await UserWeb.findById(this._idUser);
            return data ?? null;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = ManageUserService;
