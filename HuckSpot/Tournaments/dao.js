import model from "./model.js";

export const findAllTournaments = () => model.find();
export const findTournamentbyId = (tournamentId) => model.find({ _id: tournamentId });
export const updateTournament = (tournamentId, tournament) => model.updateOne({ _id: tournamentId }, { $set: tournament });
export const deleteTournament = (tournamentId) => model.deleteOne({ _id: tournamentId });
export const createTournament = (tournament) => {
  delete tournament._id;
  model.create(tournament);
};
export const findTournamentsByQuery = (query) => {
  const { name, course, date, _id } = query;
  return model.find({
    $or: [{ _id: _id }, { name: name }, { course: course }, { date: date }],
  });
};
