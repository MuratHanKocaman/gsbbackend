const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => {
        console.log("mongo_db connectttttttttt");
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = db;