const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')


// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Upload image only admin can use
router.post('/upload', auth, authAdmin, async (req, res) => {
    try {

        const image = req.files.file.tempFilePath
        console.log(image)
        cloudinary.uploader.upload(image, { folder: "test" }, async (err, result) => {
            removeTmp(image)
            const myJson = ({ public_id: result.public_id, url: result.secure_url });
            res.json(myJson);

            console.log(result)
        })
    } catch (err) {
        console.log(err)
    }
})

// Delete image only admin can use
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: 'No images Selected' })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({ msg: "Deleted Image" })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router