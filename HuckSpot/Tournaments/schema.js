import mongoose from "mongoose";

const registeredPlayer = new mongoose.Schema({
  playerId: { type: String, required: true },
  playerName: String,
});

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: String,
  date: Date,
  registeredPlayers: [registeredPlayer],
});

export default tournamentSchema;
