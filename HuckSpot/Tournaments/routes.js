import * as dao from "./dao.js";

export default function TournamentRoutes(app) {
  const createTournament = async (req, res) => {
    try {
      const tournament = await dao.createTournament(req.body);
      res.json(tournament);
    } catch (e) {
      res.sendStatus(422);
    }
  };

  const deleteTournament = async (req, res) => {
    try {
      const status = await dao.deleteTournament(req.params.tournamentId);
      res.json(status);
    } catch (err) {
      res.send(err);
    }
  };

  const findAllTournaments = async (req, res) => {
    const query = req.query;
    if (Object.keys(query).length > 0) {
      console.log(query);
      const tournaments = await dao.findTournamentsByQuery(query);
      res.json(tournaments);
      return;
    }
    const tournaments = await dao.findAllTournaments();
    res.json(tournaments);
  };

  const findTournamentById = async (req, res) => {
    try {
      const tournament = await dao.findTournamentById(req.params.tournamentId);
      res.json(tournament);
    } catch (err) {
      res.send(err);
    }
  };

  const updateTournament = async (req, res) => {
    const { tournamentId } = req.params;
    const status = await dao.updateTournament(tournamentId, req.body);
    res.json(status);
  };

  const findRecentTournaments = async (req, res) => {
    const tournaments = await dao.findRecentTournaments();
    res.json(tournaments);
  };

  const unregisterUserFromTournament = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const userId = currentUser._id;
      const tournamentId = req.params.tournamentId;
      await dao.unregisterUserFromTournament(userId, tournamentId);
      res.json("Unregistered");
      return;
    }
    res.json("Not Logged In");
  };

  const registerUserForTournament = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      const tournament = req.body;
      const userId = currentUser._id;
      await dao.registerUserForTournament(userId, tournament);
      res.json("Registered");
      return;
    }
    res.json("Not Logged In");
  };

  app.post("/api/tournaments/register", registerUserForTournament);
  app.delete("/api/tournaments/:tournamentId/unregister", unregisterUserFromTournament);
  app.post("/api/tournaments", createTournament);
  app.get("/api/tournaments", findAllTournaments);
  app.get("/api/tournaments/recent", findRecentTournaments);
  app.get("/api/tournaments/:tournamentId", findTournamentById);
  app.put("/api/tournaments/:tournamentId", updateTournament);
  app.delete("/api/tournaments/:tournamentId", deleteTournament);
}
