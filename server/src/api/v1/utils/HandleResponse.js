module.exports = {
    throwErr: function handleErrRes(res, status = 500, message) {
        return res.status(status).json({ success: false, message });
    },
    successRes: function handleSuccessRes(res, status = 200, body, message) {
        return res.status(status).json({ success: true, body, message });
    },
};
