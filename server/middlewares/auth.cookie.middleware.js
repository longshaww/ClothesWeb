module.exports.requireAuth = async (req, res, next) => {
	if (!req.signedCookies.userId) {
		res.status(403).send("You haven't sign in");
		return;
	}
	var user = await User.findOne({ _id: req.signedCookies.userId });
	if (!user) {
		res.status(403).send("You haven't sign in");
		return;
	}
	res.locals.user = user;
	next();
};
