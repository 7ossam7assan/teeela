const sharp = require('sharp');
const fs = require('fs')

const methods = {
    async upload(data) {
        return new Promise(async (resolve, reject) => {
            try {

                await sharp(__dirname+'/../public/uploads/kid.png')
                    .rotate(parseInt(data.body.imageDetails.angle),{background: {r:255,g:255,b:255,alpha:0}})
                    .flop(true)
                    .flip(true)
                    .resize(parseInt(data.body.imageDetails.width), parseInt(data.body.imageDetails.height),{fit:'fill'})
                    .toFile(__dirname+'/../public/uploads/kid2.png',function(err, buffer) {
                         // fs.writeFile(__dirname+'/../public/uploads/kid2.png', buffer, function(e) {})
                    }).png()


                await setTimeout(function (){
                      sharp(__dirname+'/../public/uploads/start.png')
                         .composite([{ input: __dirname+'/../public/uploads/kid2.png', top: parseInt(data.body.imageDetails.startPoint.y), left:  parseInt(data.body.imageDetails.startPoint.x)}])
                         .toBuffer(function(err, buffer) {
                             fs.writeFile(__dirname+'/../public/uploads/output.png', buffer, function(e) {})
                         }).png();
                 },2000)


                resolve(true)
            } catch (error) {
                reject(methods.error(error.message, 400))
            }
        });
    }
}

module.exports = { ...methods }