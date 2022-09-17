const mongoose = require("mongoose");

module.exports = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "Clothes",
        });
        console.log("Successfully connected to database ")
    } catch (err) {
        console.log(err);
    }
    
}