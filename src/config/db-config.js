const mongoose = require("mongoose");

// exports.connectDb = () => {
//   mongoose.connect("mongodb://127.0.0.1:27017/udemy_db").then((cnx) => {
//     console.log(`Database connected : ${cnx.connection.host}`);
//   });
// };

exports.connectDb = () => {
  mongoose.connect("mongodb+srv://lazare:lazare@cluster0.xymug.mongodb.net/udemy_db").then((cnx) => {
    console.log(`Database connected : ${cnx.connection.host}`);
  });
};