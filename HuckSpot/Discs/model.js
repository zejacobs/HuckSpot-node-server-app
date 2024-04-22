import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("DiscModel", schema);
export default model;
