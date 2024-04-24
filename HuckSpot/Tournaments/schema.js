import mongoose from "mongoose";

const registeredPlayer = new mongoose.Schema({
  playerId: { type: String, required: true },
  playerName: String,
});

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: String,
    date: String,
    tdName: String,
    tdId: String,
    registeredPlayers: [registeredPlayer],
  },
  { collection: "tournaments" }
);

export default tournamentSchema;
