const { AuthWrong } = require("./../model/Error");

const AllowCrossOrigin = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://hustmaths.top");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.set("Access-Control-Allow-Methods", " POST, GET, OPTIONS");
  ctx.set("Access-Control-Allow-Credentials", true);
  if (ctx.method.toUpperCase() == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
};

const Certification = async (ctx, next) => {
  const url = ["/user/account", "/picture/lists"];
  if ((ctx.session && ctx.session.user.id) || url.includes(ctx.request.url)) {
    await next();
  } else ctx.body = AuthWrong;
};

exports.AllowCrossOrigin = AllowCrossOrigin;
exports.Certification = Certification;
