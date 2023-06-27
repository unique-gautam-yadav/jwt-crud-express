const jwt = require('jsonwebtoken')

const User = require('../models/user_model')
const config = require('../../config')


module.exports.signup = async (req, res, next) => {
    try {
        const { mail, password, displayName } = req.body;

        const existing = await User.findOne({ mail });

        if (existing) {
            return res.status(409).json({ success: false, message: "User already exists" })
        }

        const user = new User({ mail: mail, password: password, displayName: displayName })

        await user.save();

        res.status(201).json({ success: true, message: "User created successfully, try logging in" })


    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}



module.exports.login = async (req, res, next) => {
    try {
        const { mail, password } = req.body;

        usr = await User.findOne({ mail })

        if (!usr) {
            return res.status(401).json({ success: false, message: "Invalid mail" })
        }

        const isMatch = usr.password == password;
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" })
        }

        const token = jwt.sign({ mail: usr.mail, _id: usr._id, displayName: usr.displayName, }, config.SECRET_KEY, { expiresIn: '1h' })

        if (token) {
            return res.json({ success: true, data: { token: token } })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }

}