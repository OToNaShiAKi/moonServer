const router = require("koa-router")();
const User = require("./../controller/user");
const { init } = require("./../model/Error");

router.prefix("/user");

router.post("/account", async (ctx, next) => {
  const info = ctx.request.body;
  try {
    const result = await User.Account(info);
    if (result.status === 200) ctx.session.user = result.data;
    ctx.body = result;
  } catch (err) {
    ctx.body = init(err);
  }
});

router.post("/info", async (ctx, next) => {
  const info = ctx.request.body;
  info.id = ctx.session.user.id;
  try {
    const result = await User.Info(info);
    ctx.body = result;
    ctx.session.user.name = info.name;
    ctx.session.user.uid = info.uid;
    ctx.session.user.telphone = info.telphone;
  } catch (err) {
    ctx.body = init(err);
  }
});

router.get("/logout", async (ctx, next) => {
  delete ctx.session.user;
  ctx.body = {
    status: 200,
    message: "退出登录成功",
  };
});

module.exports = router;
