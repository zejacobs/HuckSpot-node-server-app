import model from "./model.js";
import userModel from "../Users/model.js";

export const findAllTournaments = () => model.find();
export const findTournamentById = (tournamentId) => model.find({ _id: tournamentId });
export const updateTournament = (tournamentId, tournament) => model.updateOne({ _id: tournamentId }, { $set: tournament });
export const deleteTournament = (tournamentId) => model.deleteOne({ _id: tournamentId });
export const createTournament = (tournament) => {
  delete tournament._id;
  model.create(tournament);
  return tournament;
};
export const findTournamentsByQuery = (query) => {
  const { name, course, date, _id } = query;
  return model.find({
    $or: [{ _id: _id }, { name: name }, { course: course }, { date: date }],
  });
};
export const findRecentTournaments = () => model.find().limit(3).sort({ $natural: -1 });

export const registerUserForTournament = async (userId, tournament) => {
  const user = await userModel.findById(userId);
  if (!!user.tournaments.find((t) => t.tournamentId === tournament.tournamentId)) {
    return;
  }
  let actualTournament = await model.findOne({ _id: tournament.tournamentId });
  if (actualTournament) {
    user.tournaments.push(tournament);
    let playerData = { playerId: user._id, playerName: `${user.firstName} ${user.lastName}` };
    actualTournament.registeredPlayers.push(playerData);
    console.log(actualTournament.registeredPlayers);
    await user.save();
    await actualTournament.save();
  }
};

export const unregisterUserFromTournament = async (userId, tournamentId) => {
  const user = await userModel.findById(userId);
  const tournament = await model.findById(tournamentId);
  user.tournaments = user.tournaments.filter((t) => t.tournamentId !== tournamentId);
  tournament.registeredPlayers = tournament.registeredPlayers.filter((player) => player.playerId !== userId);
  await user.save();
  await tournament.save();
};
