const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userDetails = new Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  organizationName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const UserSchema = model("userDetails", userDetails);

module.exports = UserSchema;
