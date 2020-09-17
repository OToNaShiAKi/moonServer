module.exports = {
  init: ({ code = 1000, message = "服务器运行错误" }) => ({
    status: code,
    message,
  }),
  UserWrong: {
    status: 1001,
    message: "昵称重复或密码错误",
  },
  InfoWrong: {
    status: 1002,
    message: "手机或学号已被占用",
  },
  AuthWrong: {
    status: 1003,
    message: "未登陆不可操作",
  },
  ImageWrong: {
    status: 1003,
    message: "传图失败",
  },
};
