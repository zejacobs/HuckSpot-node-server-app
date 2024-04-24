import userModel from "../Users/model.js";
import discModel from "../Discs/model.js";

export const userLikesDisc = async (userId, disc) => {
  const user = await userModel.findById(userId);
  if (!!user.likedDiscs.find((likedDisc) => likedDisc.discId === disc.discId)) {
    return;
  }

  let actualDisc = await discModel.findOne({ discId: disc.discId });
  if (!actualDisc) {
    actualDisc = await discModel.create(disc);
  }
  user.likedDiscs.push(disc);
  actualDisc.likedBy.push({ userId: user._id, name: `${user.firstName} ${user.lastName}` });
  await user.save();
  await actualDisc.save();
};
export const userUnlikesDisc = async (userId, discId) => {
  const user = await userModel.findById(userId);
  const disc = await discModel.findOne({ discId });
  user.likedDiscs = user.likedDiscs.filter((disc) => disc.discId !== discId);
  disc.likedBy = disc.likedBy.filter((user) => user.userId !== userId);
  await user.save();
  await disc.save();
};

export const findDiscsUserLikes = async (userId) => {
  const user = await userModel.findById(userId).populate("likedDiscs");
  return user.likedDiscs;
};
