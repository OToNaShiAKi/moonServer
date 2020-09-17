const Picture = require("./../model/Picture");
const User = require("./../model/User");

exports.SavePicture = async (form) => {
  const list = new Picture(form).save();
  User.increment("pictures", { where: { id: form.id } });
  return list;
};
