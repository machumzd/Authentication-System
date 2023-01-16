const dotenv = require('dotenv');
dotenv.config({ path: "config.env" })

module.exports={
    secretKey:process.env.secretKey,
    mongo_url:process.env.mongo_url,
    dPassword:process.env.dPassword

}