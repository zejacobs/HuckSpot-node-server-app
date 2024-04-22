import model from "./model.js";

export const findDiscs = () => model.find();
export const findDiscbyId = (discId) => model.find({ discId: discId });
export const updateDisc = (discId, disc) => model.updateOne({ discId: discId }, { $set: disc });
export const deleteDisc = (discId) => model.deleteOne({ discId: discId });
export const createDisc = (disc) => {
  delete disc._id;
  model.create(disc);
};
