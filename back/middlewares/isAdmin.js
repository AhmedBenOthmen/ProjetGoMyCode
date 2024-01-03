const User = require("../models/user.js");

const isAdmin = (req, res, next) => {
  const userId = req.user._id;
  const user = User.findById(userId);
  if (!user.isAdmin) {
    res.status(401).json({ errors: [{ msg: "you are not authorized" }] });
  }
  next();
};
module.exports = isAdmin;