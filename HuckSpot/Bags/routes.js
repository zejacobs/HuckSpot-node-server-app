import * as dao from "./dao.js";

export default function BagsRoutes(app) {
  const userBagsDisc = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const disc = req.body;
    const userId = currentUser._id;

    await dao.userBagsDisc(userId, disc);
    res.json("Bagged");
  };
  app.post("/api/bags", userBagsDisc);

  const userUnbagsDisc = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const userId = currentUser._id;
      const discId = req.params.discId;
      await dao.userUnbagsDisc(userId, discId);
      res.json("Unbagged");
      return;
    }
    res.json("Not Logged In");
  };
  app.delete("/api/bags/:discId", userUnbagsDisc);

  app.get("/api/bags", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const userId = currentUser._id;
      const baggedDiscs = await dao.findDiscsUserBags(userId);
      res.json(baggedDiscs);
      return;
    }
    res.send("Not Logged In");
  });
}
