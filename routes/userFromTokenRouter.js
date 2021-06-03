const router = require('express').Router()
const userController = require('../controllers/getUsersFromToken')
const jwt = require('jsonwebtoken')
const {
    jwtSecret,
    jwtExpire,
    sendgridApiKey,
    activationTokenSecret,
} = require("../config/keys");

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    try {
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication" })
            req.id = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

router.route('/user/token/byGuest')
    .get(auth, userController.guest)

router.route('/user/token/byOwner')
    .get(auth, userController.owner)



module.exports = router