import { createClient } from "redis";

const redisClient = createClient()
  .on("connect", () => console.log("Redis connected"))
  .on("error", (err) => console.log("Redis Error", err));

redisClient.connect();

export default redisClient;
