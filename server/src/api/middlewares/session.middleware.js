const Session = require('../models/Sessions');

module.exports = async (req, res, next) => {
    const sessionId = req.signedCookies.sessionId;
    let session;
    if (!sessionId) {
        session = await Session.create({});
    } else {
        const currentSession = await Session.findById(sessionId);
        if (!currentSession) {
            session = await Session.create({});
        } else {
            session = currentSession;
        }
    }
    res.locals.session = session;
    res.cookie('sessionId', session.id, { signed: true });
    next();
};
