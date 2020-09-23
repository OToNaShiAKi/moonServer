const { connect, connection, disconnect } = require("mongoose");
const Mongo = "mongodb://root:hustmathskexie@localhost:27017/moon?authSource=admin"
// const Mongo = "mongodb://localhost:27017/moon";


connect(Mongo, { useNewUrlParser: true, useUnifiedTopology: true });

connection.on("open", () => {
  console.error("open");
});

connection.on("error", (err) => {
  console.error(err);
  disconnect();
});

connection.on("close", () => {
  connect(Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
