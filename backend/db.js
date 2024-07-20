const mongoose = require('mongoose');
const MongoURI = 'mongodb+srv://sujitavchar:sujit0205@cluster0.fxpdvg4.mongodb.net/blogbook';

const connectToMongo = async ()=>{
    await mongoose.connect(MongoURI);
    console.log("Connected to mongodb")
}

module.exports = connectToMongo;