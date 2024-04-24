import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";

import UserRoutes from "./HuckSpot/Users/routes.js";
import DiscRoutes from "./HuckSpot/Discs/routes.js";
import DiscItApiRoutes from "./HuckSpot/DiscItApi/routes.js";
import LikeRoutes from "./HuckSpot/Likes/routes.js";
import BagsRoutes from "./HuckSpot/Bags/routes.js";
import TournamentRoutes from "./HuckSpot/Tournaments/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

UserRoutes(app);
DiscRoutes(app);
DiscItApiRoutes(app);
LikeRoutes(app);
BagsRoutes(app);
TournamentRoutes(app);

app.listen(process.env.PORT || 4000);
