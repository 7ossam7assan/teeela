const express = require('express');
const router = express.Router();

const multer  = require('multer')

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error('wrong image extension'))    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})



const upload = multer({ storage: storage, fileFilter:multerFilter })

const template_controller = require('../../controllers/template.controller')

const cpUpload = upload.fields([{ name: 'template', maxCount: 1, }, { name: 'image', maxCount: 1 }])

router.post('/create',  cpUpload, template_controller.onUpload);

module.exports = router;
