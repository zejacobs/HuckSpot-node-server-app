import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("TorunamentModel", schema);
export default model;
