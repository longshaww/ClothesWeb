module.exports = {
    throwErr: function handleErrRes(res, status, message) {
        return res.status(status).json({ success: false, message });
    },
    successRes: function handleSuccessRes(res, status, body, message) {
        return res.status(status).json({ success: true, body, message });
    },
};
