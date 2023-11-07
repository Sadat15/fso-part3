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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (val) => {
        dashCounter = 0;
        for (let i = 0; i < val.length; i++) {
          if (val[i] === "-") {
            dashCounter++;
          }
        }
        if (dashCounter !== 1) {
          return false;
        }

        function isStringNumeric(inputString) {
          for (let i = 0; i < inputString.length; i++) {
            if (isNaN(parseInt(inputString[i]))) {
              return false;
            }
          }
          return true;
        }

        if (
          isStringNumeric(val.substring(0, 2)) &&
          isStringNumeric(val.slice(3))
        ) {
          return true;
        } else if (
          isStringNumeric(val.substring(0, 3)) &&
          isStringNumeric(val.slice(4))
        ) {
          return true;
        } else {
          return false;
        }
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);

// person.save().then((result) => {
//   console.log(`added ${person.name} number ${person.number} to phonebook`);
// });
