const Session = require('../models/Sessions');

module.exports = async (req, res, next) => {
    const sessionId = req.signedCookies.sessionId;
    let session;
    if (sessionId) {
        session = await Session.findById(sessionId);
    } else {
        session = await Session.create({});
        res.cookie('sessionId', session.id, { signed: true });
    }
    if (!session) res.status(400).json({ success: false, message: 'Session không tồn tại' });

    res.locals.session = session;
    next();
};
