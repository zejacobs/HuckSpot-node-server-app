import mongoose from "mongoose";

const userDiscSchema = new mongoose.Schema({
  discId: { type: String, required: true },
  name: { type: String },
  category: String,
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: {
      type: String,
      enum: ["USER", "TOURNAMENT_DIRECTOR", "ADMIN"],
      default: "USER",
    },
    likedDiscs: { type: [userDiscSchema] },
    baggedDiscs: { type: [userDiscSchema] },
  },
  { collection: "users" }
);

export default userSchema;
