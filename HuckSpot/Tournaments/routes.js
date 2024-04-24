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
    const status = await dao.deleteTournament(req.params.tournamentId);
    res.json(status);
  };

  const findAllTournaments = async (req, res) => {
    const query = req.query;
    if (query) {
      const tournaments = await dao.findTournamentsByQuery(query);
      res.json(tournaments);
      return;
    }
    const tournaments = await dao.findAllTournaments();
    res.json(tournaments);
  };

  const findTournamentById = async (req, res) => {
    const tournament = await dao.findTournamentById(req.params.tournamentId);
    res.json(tournament);
  };

  const updateTournament = async (req, res) => {
    const { tournamentId } = req.params;
    const status = await dao.updateTournament(tournamentId, req.body);
    res.json(status);
  };

  app.post("/api/tournaments", createTournament);
  app.get("/api/tournaments", findAllTournaments);
  app.get("/api/tournaments/:tournamentId", findTournamentById);
  app.put("/api/tournaments/:tournamentId", updateTournament);
  app.delete("/api/tournaments/:tournamentId", deleteTournament);
}
