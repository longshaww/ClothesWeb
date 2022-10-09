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
} = require('..');

const Command = require('./');

class CreateVoucher {
    constructor(body) {
        this.body = body;
    }
    async execute() {
        return await createVoucher(this.body);
    }
}

class EditVoucher {
    constructor(id, body) {
        this.id = id;
        this.body = body;
    }
    async execute() {
        return await editVoucher(this.id, this.body);
    }
}

class DeleteVoucher {
    constructor(id) {
        this.id = id;
    }
    async execute() {
        return await deleteVoucher(this.id);
    }
}

class ListVoucher {
    constructor(code, amount, user) {
        this.code = code;
        this.amount = amount;
        this.user = user;
    }
    async execute() {
        return await listVoucher(this.code, this.amount, this.user);
    }
}
class ApplyVoucher {
    constructor(code, amount) {
        this.code = code;
        this.amount = amount;
    }
    async execute() {
        return await applyVoucher(this.code, this.amount);
    }
}
class UserGetVoucher {
    constructor(code, user) {
        this.code = code;
        this.user = user;
    }
    async execute() {
        return await userGetVoucher(this.code, this.user);
    }
}
class UpdateState {
    constructor(id, userID) {
        this.id = id;
        this.userID = userID;
    }
    async execute() {
        return await updateState(this.id, this.userID);
    }
}
class DetailVoucher {
    constructor(id) {
        this.id = id;
    }
    async execute() {
        return await detailVoucher(this.id);
    }
}
class MyVoucher {
    constructor(id) {
        this.id = id;
    }
    async execute() {
        return await myVoucher(this.id);
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
