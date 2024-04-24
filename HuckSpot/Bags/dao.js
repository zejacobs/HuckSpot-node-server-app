import userModel from "../Users/model.js";
import discModel from "../Discs/model.js";

export const userBagsDisc = async (userId, disc) => {
  const user = await userModel.findById(userId);
  if (!!user.baggedDiscs.find((baggedDisc) => baggedDisc.discId === disc.discId)) {
    return;
  }

  let actualDisc = await discModel.findOne({ discId: disc.discId });
  if (!actualDisc) {
    actualDisc = await discModel.create(disc);
  }
  user.baggedDiscs.push(disc);
  await user.save();
};
export const userUnbagsDisc = async (userId, discId) => {
  const user = await userModel.findById(userId);
  user.baggedDiscs = user.baggedDiscs.filter((disc) => disc.discId !== discId);
  await user.save();
};

export const findDiscsUserBags = async (userId) => {
  const user = await userModel.findById(userId).populate("baggedDiscs");
  return user.baggedDiscs;
};
