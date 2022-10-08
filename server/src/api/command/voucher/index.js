const {
    createVoucher,
    editVoucher,
    deleteVoucher,
    listVoucher,
    applyVoucher,
    userGetVoucher,
    updateState,
    detailVoucher,
    myVoucher,
} = require('../../services/admin/voucher');

const Command = require('../');

class CreateVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        createVoucher(this.req, this.res);
    }
}

class EditVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        editVoucher(this.req, this.res);
    }
}

class DeleteVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        deleteVoucher(this.req, this.res);
    }
}

class ListVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        listVoucher(this.req, this.res);
    }
}
class ApplyVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        applyVoucher(this.req, this.res);
    }
}
class UserGetVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        userGetVoucher(this.req, this.res);
    }
}
class UpdateState {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        updateState(this.req, this.res);
    }
}
class DetailVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        detailVoucher(this.req, this.res);
    }
}
class MyVoucher {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }
    execute() {
        myVoucher(this.req, this.res);
    }
}
module.exports = {
    Command,
    CreateVoucher,
    EditVoucher,
    DeleteVoucher,
    ListVoucher,
    ApplyVoucher,
    UserGetVoucher,
    UpdateState,
    DetailVoucher,
    MyVoucher,
};
