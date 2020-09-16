const User = require("./../model/User");

const md5 = require("blueimp-md5");

/* exports.FindRank = async (_id) => {
  const users = await User.find().sort(Rank).select("_id");
  for (let index in users) {
    if (users[index]._id.toString() == _id) return Number(index) + 1;
  }
};
 */
exports.FindUser = async (filter) => {
  const user = await User.findOne({ where: filter });
  // if (user) user.rank = await this.FindRank(user._id);
  return user;
};

exports.CreateUser = async (info) => {
  info.id = md5("S&T-" + info.nick + "-" + Date.now());
  const user = await User.create(info);
  // result.rank = await this.FindRank(result._id);
  return user.dataValues;
};

/* exports.UpdateInfo = async (info) => {
  const user = await User.findById(info._id);
  user.phone = info.phone;
  user.name = info.name;
  user.uid = info.uid;
  await user.save();
};
 */

/* exports.AllRank = async () => {
  const users = await User.find({ integral: { $ne: 0 } })
    .sort(Rank)
    .select("nick integral uid race");
  return users;
}; */
