import * as dao from "./dao.js";

export default function LikeRoutes(app) {
  const userLikesDisc = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const disc = req.body;
      const userId = currentUser._id;
      await dao.userLikesDisc(userId, disc);
      res.json("Liked");
      return;
    }
    res.json("Not Logged In");
  };
  app.post("/api/likes", userLikesDisc);

  const userUnlikesDisc = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const userId = currentUser._id;
      const discId = req.params.discId;
      await dao.userUnlikesDisc(userId, discId);
      res.json("Unliked");
      return;
    }
    res.json("Not Logged In");
  };
  app.delete("/api/likes/:discId", userUnlikesDisc);

  const findRecentLikes = async (req, res) => {
    const response = await dao.findRecentLikes();
    res.json(response);
  };
  app.get("api/likes/recent");

  const findUserLikes = async (req, res) => {
    // const currentUser = req.session["currentUser"];
    //if (currentUser) {
    //const userId = currentUser._id;
    const userId = req.params.userId;
    try {
      const likes = await dao.findDiscsUserLikes(userId);
      res.json(likes);
      return;
    } catch (err) {
      res.json([]);
    }
    //res.json([]);
  };
  app.get("/api/likes/:userId", findUserLikes);
}
