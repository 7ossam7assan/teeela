const Service = require('../services/template.service')
const { Validator } = require('node-input-validator');
require('dotenv').config();

const methods = {
    async onUpload(req, res){
        try {
            const v = new Validator(
                      req.body,
                {
                    'imageDetails': 'required|object',
                    'imageDetails.startPoint.x': 'required|numeric',
                    'imageDetails.startPoint.y': 'required|numeric',
                    'imageDetails.width': 'required|numeric',
                    'imageDetails.height': 'required|numeric',
                    'imageDetails.angle': 'required|numeric',
                },
            );

            if (v.fails()) {
                if (!(Object.keys(v.errors).length === 0 && v.errors.constructor === Object))
                     res.status(400).json({messages:v.errors})
            }

            let result =  await Service.upload(req)
            res.sendFile(__dirname + "/../public/uploads/kid.png");
            res.status(200).json({finalTemplateURL:process.env.URL+':'+process.env.PORT+"/uploads/output.png"})

        } catch (error) {
            res.error(error.message, error.status)
        }
    }
}

module.exports = { ...methods }