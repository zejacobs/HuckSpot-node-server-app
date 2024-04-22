import mongoose from "mongoose";

const byUserDiscSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const discSchema = new mongoose.Schema(
  {
    discId: { type: String, required: true, unique: true },
    likedBy: { type: [byUserDiscSchema] },
    baggedBagged: { type: [byUserDiscSchema] },
  },
  { collection: "discs" }
);

export default discSchema;
