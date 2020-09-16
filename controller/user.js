const User = require("./../service/user");

const ErrorCode = require("./../model/Error");

const md5 = require("blueimp-md5");
const salt = ["S&T", "hustmaths"];

exports.Account = async (info) => {
  info.password = md5(salt[0] + info.password + salt[1]);

  try {
    const user = await User.FindUser({ nick: info.nick });
    if (!user) {
      const create = await User.CreateUser(info);
      return {
        status: 200,
        message: "注册成功",
        data: create,
      };
    }
    if (user.password !== info.password) return ErrorCode.UserWrong;
    else
      return {
        status: 200,
        message: "登录成功",
        data: user,
      };
  } catch (err) {
    return ErrorCode.init(err);
  }
};
