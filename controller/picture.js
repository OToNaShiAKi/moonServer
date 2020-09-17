const formidable = require("formidable");
const ErrorCode = require("./../model/Error");
const Picture = require("./../service/picture");

const path = require("path");
const uploadDir = path.join(__dirname, "./../upload");

exports.Upload = async (req, id) => {
  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });
  try {
    const picture = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) throw err;
        fields.lists = [];
        fields.id = id;
        for (let key in files) {
          const url = path.basename(files[key].path);
          fields.lists.push(url);
          console.log(url);
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
  } catch (err) {
    return ErrorCode.init(err);
  }
};
