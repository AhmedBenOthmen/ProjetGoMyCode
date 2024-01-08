const AuthHelper = require('../helpers/AuthHelper.js');
const jwt = require("jsonwebtoken")

const isAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.replace(/^"(.*)"$/, '$1');
        if (!token) {
            return res.status(401).json({ errors: [{ msg: "You are not authorized" }] });
        }
        const KEY = process.env.KEY;
        const decoded = jwt.verify(token,KEY);
        req.user = { id: decoded.userId };
        next();
                
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
};

module.exports = isAuth;
