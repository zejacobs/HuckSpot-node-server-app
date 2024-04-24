import * as dao from "./dao.js";

export default function LikeRoutes(app) {
  const userLikesDisc = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const disc = req.body;
    const userId = currentUser._id;

    await dao.userLikesDisc(userId, disc);
    res.json("Liked");
  };
  app.post("/api/likes", userLikesDisc);

  const userUnlikesDisc = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const discId = req.params.discId;
    await dao.userUnlikesDisc(userId, discId);
    res.json("Unliked");
  };
  app.delete("/api/likes/:discId", userUnlikesDisc);
}
