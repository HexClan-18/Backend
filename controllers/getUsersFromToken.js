const Guest = require('../models/Guest')
const Owner = require('../models/Owner')

const userController = {
    guest: async (req, res) => {
        try {
            console.log(req.id);
            const guests = await Guest.findOne({ _id: req.id })
            res.json(guests)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    owner: async (req, res) => {
        try {
            const guests = await Owner.findOne({ _id: req._id })
            res.json(guests)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = userController