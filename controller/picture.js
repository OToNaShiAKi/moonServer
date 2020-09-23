const formidable = require("formidable");
const Picture = require("./../service/picture");
const ErrorCode = require("./../model/Error");

const path = require("path");
const fs = require("fs");
const uploadDir = path.resolve(__dirname, './../../../../wwwroot/hustmaths/moon/uploads/')

exports.Upload = async (req, { id, nick }) => {
  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });
  const picture = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      fields.lists = [];
      fields.id = id;
      fields.nick = nick;
      for (let key in files) {
        const url = path.basename(files[key].path);
        fields.lists.push(url);
      }
      resolve(fields);
    });
  });
  const result = await Picture.SavePicture(picture);
  return {
    status: 200,
    message: "发布成功",
    data: result,
  };
};

exports.GetCards = async (query) => {
  let sort;
  if (query === "hot") sort = {};
  const result = await Picture.GetCards(sort);
  return {
    status: 200,
    data: result,
  };
};

exports.LikeAndComment = async (_id, user, text) => {
  const { id, nick, uid } = user;

  if (!uid && !text) return ErrorCode.TrueWrong;
  if (text) await Picture.Comment(_id, { id, nick, text });
  else await Picture.Like(_id, id);
  return { status: 200 };
};

exports.Remove = async (id, user, index) => {
  if (!(index >= 0)) {
    const result = await Picture.FindPictures(id);
    const promise = [];
    for (let picture of result) {
      const url = path.join(uploadDir, picture);
      promise.push(
        new Promise((resolve) => {
          fs.unlink(url, (err) => {
            if (err) throw err;
            resolve();
          });
        })
      );
    }
    await Promise.all(promise);
  }
  await Picture.Remove(id, user, index);
  return { status: 200 };
};
