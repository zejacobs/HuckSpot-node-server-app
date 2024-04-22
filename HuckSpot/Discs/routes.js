import * as dao from "./dao.js";

export default function DiscRoutes(app) {
  app.get("/api/discs/:discId", async (req, res) => {
    const { discId } = req.params;
    const course = await dao.findDiscbyId(discId);
    if (!course) {
      res.status(404).send("Disc not found");
      return;
    }
    res.send(course);
  });

  app.put("/api/discs/:discId", async (req, res) => {
    const { discId } = req.params;
    const disc = req.body;
    await dao.updateDisc(discId, disc);
    res.sendStatus(204);
  });

  app.delete("/api/discs/:discId", async (req, res) => {
    const { discId } = req.params;
    await dao.deleteDisc(discId);
    res.sendStatus(204);
  });

  app.post("/api/discs", async (req, res) => {
    const disc = { ...req.body };
    await dao.createDisc(disc);
    res.send(disc);
  });

  app.get("/api/discs", async (req, res) => {
    const courses = await dao.findDisc();
    res.send(courses);
  });
}
