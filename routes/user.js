const router = require("koa-router")();
const User = require("./../controller/user");

router.prefix("/user");

router.post("/account", async (ctx, next) => {
  const info = ctx.request.body;

  const result = await User.Account(info || ctx.session.user);
  if (result.status === 200) ctx.session.user = info;

  ctx.body = result;
});

module.exports = router;
