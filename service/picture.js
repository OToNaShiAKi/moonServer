const Picture = require("./../model/Picture");
const User = require("./../model/User");

exports.SavePicture = async (form) => {
  const card = new Picture(form).save();
  User.increment("pictures", { where: { id: form.id } });
  return card;
};

exports.GetCards = async (sort = { upTime: -1 }) => {
  let lists = await Picture.find().sort(sort);
  if (!sort.upTime)
    lists = lists.sort((a, b) => b.likes.length - a.likes.length);
  let cards = {};
  for (let item of lists) cards[item._id] = item;
  return cards;
};

exports.Like = async (id, user) => {
  let list = await Picture.findById(id);
  const index = list.likes.indexOf(user);
  if (index === -1) list.likes.push(user);
  else list.likes.splice(index, 1);
  await list.save();
  return index === -1;
};

exports.Comment = async (id, comment) => {
  let list = await Picture.findById(id);
  list.comments.push(comment);
  await list.save();
};

exports.Remove = async (_id, id, index) => {
  if (index >= 0) {
    let list = await Picture.findById(_id);
    list.comments.splice(index, 1);
    await list.save();
  } else {
    await Picture.deleteOne({ _id });
    await User.increment({ pictures: -1 }, { where: { id } });
  }
};

exports.FindPictures = async (id) => {
  const card = await Picture.findById(id);
  return card.lists;
};
