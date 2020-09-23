const router = require("koa-router")();
const Picture = require("./../controller/picture");
const { init } = require("./../model/Error");

router.prefix("/picture");

router.post("/upload", async (ctx, next) => {
  try {
    const result = await Picture.Upload(ctx.req, ctx.session.user);
    ctx.body = result;
  } catch (err) {
    ctx.body = init(err);
  }
});

router.get("/cards", async (ctx, next) => {
  const sort = ctx.request.query.sort;
  ctx.session.sort = sort;
  try {
    const result = await Picture.GetCards(sort);
    ctx.body = result;
  } catch (err) {
    ctx.body = init(err);
  }
});

router.post("/like", async (ctx, next) => {
  const { id, text } = ctx.request.body;
  const user = ctx.session.user;
  try {
    const result = await Picture.LikeAndComment(id, user, text);
    ctx.body = result;
  } catch (err) {
    ctx.body = init(err);
  }
});

router.get("/remove", async (ctx, next) => {
  const { id, index } = ctx.request.query;
  const user = ctx.session.user.id;
  try {
    const result = await Picture.Remove(id, user, index);
    ctx.body = result;
  } catch (err) {
    ctx.body = init(err);
  }
});

module.exports = router;
