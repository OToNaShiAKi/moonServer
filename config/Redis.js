const redis = require("redis");
const Redis = {
  host: "localhost",
  port: 6379,
};

const client = redis.createClient(Redis);

client.on("error", (error) => {
  console.log(error);
});

const set = (key, value) => {
  value = JSON.stringify(value);
  client.set(key, value, redis.print);
};

const get = async (key) => {
  const result = await client.get(key);
  return JSON.parse(result);
};

module.exports = { set, get, config: Redis };
