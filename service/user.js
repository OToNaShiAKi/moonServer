const User = require("./../model/User");
const Picture = require("./../model/Picture");

const md5 = require("blueimp-md5");

exports.FindRank = async (id) => {
  let lists = await Picture.find().select("likes id");
  lists = lists.sort((a, b) => b.likes.length - a.likes.length);
  for (let index = 0; index < lists.length; index++)
    if (lists[index].id == id) return index + 1;
};

exports.FindUser = async (filter) => {
  const user = await User.findOne({ where: filter });
  if (user) {
    user.dataValues.rank = await this.FindRank(user.dataValues.id);
    return user.dataValues;
  }
  return user;
};

exports.CreateUser = async (info) => {
  info.id = md5("S&T-" + info.nick + "-" + Date.now());
  const user = await User.create(info);
  user.dataValues.rank = await this.FindRank(user.dataValues.id);
  return user.dataValues;
};

exports.UpdateInfo = async (info) => {
  const where = { id: info.id };
  await User.update(info, { where });
};

/* exports.AllRank = async () => {
  const users = await User.find({ integral: { $ne: 0 } })
    .sort(Rank)
    .select("nick integral uid race");
  return users;
}; */
