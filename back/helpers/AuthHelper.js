const jwt = require('jsonwebtoken');
const dotenv =require("dotenv");
dotenv.config();

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_KEY, { expiresIn: '356d' });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_KEY, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

const verifyAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, process.env.ACCESS_KEY, (err, decoded) => {
            if (err) {
                reject(err)
                return false;
            } else {
                 resolve(decoded.userId);
                 return true
            }
        });
    });
};
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded.userId);
            }
        });
    });
};

const refreshAccessToken = async (refreshToken) => {
    try {
        const userId = await verifyRefreshToken(refreshToken);
        const newAccessToken = jwt.sign({ userId }, process.env.ACCESS_KEY, { expiresIn: '365d' });
        return newAccessToken;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    generateTokens,
    refreshAccessToken,
    verifyAccessToken
};
