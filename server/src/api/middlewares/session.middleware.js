const Session = require("../models/Sessions");

module.exports = async (req, res, next) => {
	if (!req.signedCookies.sessionId) {
		const session = await Session.create({});
		res.cookie("sessionId", session.id, { signed: true });
	}
	next();
};
