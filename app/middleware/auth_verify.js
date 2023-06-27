const jwt = require("jsonwebtoken");

const config = require("../../config");

tokenVerify = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    await jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token" })
        }
        req.user = decoded;
        next();
    })

}

module.exports = {
    tokenVerify,
}