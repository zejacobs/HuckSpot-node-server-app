import model from "./model.js";

export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByQuery = (query) => {
  const { firstName, lastName, pdgaNum, _id } = query;
  return model.find({
    $or: [{ _id: _id }, { pdgaNum: pdgaNum }, { lastName: lastName }, { firstName: firstName }],
  });
};
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
