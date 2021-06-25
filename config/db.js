const mongoose = require('mongoose');
require('dotenv').config();
let db = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connection success');
  } catch (error) {
    console.log('mongoDB connection faild' + error);
  }
};

module.exports = connectDB;
