const config= require('../../config/config')
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


module.exports = {
    connectToDb: (cb) => {
        mongoose.connect(config.mongo_url,{ useNewUrlParser: true })
            .then(() => {
                console.log("connected to DB")
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err)
            })
    }
}

