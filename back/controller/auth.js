const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      email: req.body.email,
      isActive: true,
    });
    if (existingUser) {
      return res.status(200).json({
        payload: "Email already exists, type another Email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); // maxAge en milisecondes = 1 Day
    res.setHeader('Authorization', token); // maxAge en millisecondes = 1h
    return res.status(201).json({
      payload: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: "Error register Auth a user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({
        payload: "Email Or Password incorrect",
      });
    }

    const passwordMAtch = await bcrypt.compare(password, user.password);
    if (!passwordMAtch) {
      return res.status(401).json({
        payload: "Email Or Password incorrect",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    res.setHeader('Authorization', token); // maxAge en millisecondes = 1h
    return res.status(200).json({
      payload: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      payload: "Error loggin a user",
    });
  }
};

exports.logout = (req, res) => {
  return res.clearCookie("token").status(200).json({ payload: "LogOut" });
};
