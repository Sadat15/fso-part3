require("dotenv").config();

const mongoose = require("mongoose");

url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Person.find({}).then((result) => {
//   result.forEach((person) => {
//     console.log(person.name, person.number);
//   });
//   mongoose.connection.close();
// });

module.exports = mongoose.model("Person", personSchema);

// person.save().then((result) => {
//   console.log(`added ${person.name} number ${person.number} to phonebook`);
// });
