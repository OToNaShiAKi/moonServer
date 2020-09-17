const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redis = require("koa-redis");

const { config } = require("./config/Redis");

const user = require("./routes/user");
const picture = require("./routes/picture");

const { AllowCrossOrigin, Certification } = require("./config/Intercept");
app.use(AllowCrossOrigin);

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.keys = ["hustmathskexie"];
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: redis({ all: `${config.host}:${config.port}` }),
  })
);
app.use(Certification);

// routes
app.use(user.routes(), user.allowedMethods());
app.use(picture.routes(), picture.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
