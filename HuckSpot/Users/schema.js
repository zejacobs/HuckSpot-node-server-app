import mongoose from "mongoose";

const userDiscSchema = new mongoose.Schema({
  discId: { type: String, required: true },
  name: { type: String },
  category: String,
});

const userTournamentSchema = new mongoose.Schema({
  tournamentId: { type: String, required: true },
  tournamentName: String,
  tournamentDate: Date,
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    pdgaNum: Number,
    role: {
      type: String,
      enum: ["USER", "TOURNAMENT_DIRECTOR", "ADMIN"],
      default: "USER",
    },
    likedDiscs: { type: [userDiscSchema] },
    baggedDiscs: { type: [userDiscSchema] },
    tournaments: { type: [userTournamentSchema] },
  },
  { collection: "users" }
);

export default userSchema;
