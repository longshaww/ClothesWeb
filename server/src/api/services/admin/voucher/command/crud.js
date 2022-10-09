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
class IActionVoucher {
    constructor() {}
    execute() {}
}

class CreateVoucher extends IActionVoucher {
    constructor(body) {
        super();
        this.body = body;
    }
    async execute() {
        return await createVoucher(this.body);
    }
}

class EditVoucher extends IActionVoucher {
    constructor(id, body) {
        super();
        this.id = id;
        this.body = body;
    }
    async execute() {
        return await editVoucher(this.id, this.body);
    }
}

class DeleteVoucher extends IActionVoucher {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute() {
        return await deleteVoucher(this.id);
    }
}

class ListVoucher extends IActionVoucher {
    constructor(code, amount, user) {
        super();
        this.code = code;
        this.amount = amount;
        this.user = user;
    }
    async execute() {
        return await listVoucher(this.code, this.amount, this.user);
    }
}
class ApplyVoucher extends IActionVoucher {
    constructor(code, amount) {
        super();
        this.code = code;
        this.amount = amount;
    }
    execute() {
        applyVoucher(this.code, this.amount);
    }
}
class UserGetVoucher extends IActionVoucher {
    constructor(code, user) {
        super();
        this.code = code;
        this.user = user;
    }
    async execute() {
        return await userGetVoucher(this.code, this.user);
    }
}
class UpdateState extends IActionVoucher {
    constructor(id, userID) {
        this.id = id;
        this.userID = userID;
    }
    async execute() {
        return await updateState(this.id, this.userID);
    }
}
class DetailVoucher extends IActionVoucher {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute() {
        return await detailVoucher(this.id);
    }
}
class MyVoucher extends IActionVoucher {
    constructor(id) {
        super();
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
