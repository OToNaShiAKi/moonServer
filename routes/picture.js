const router = require("koa-router")();
const Picture = require("./../controller/picture");

router.prefix("/picture");

router.post("/upload", async (ctx, next) => {
  const result = await Picture.Upload(ctx.req, ctx.session.user.id);
  ctx.body = result;
});

module.exports = router;
