import { mongo } from "mongoose";
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
  const mongoQuery = [];
  if (_id) {
    mongoQuery.push({ _id: _id });
  }
  if (pdgaNum) {
    mongoQuery.push({ pdgaNum: pdgaNum });
  }
  if (firstName) {
    mongoQuery.push({ firstName: firstName });
  }
  if (lastName) {
    mongoQuery.push({ lastName: lastName });
  }
  return model.find({
    $or: mongoQuery,
  });
};
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
