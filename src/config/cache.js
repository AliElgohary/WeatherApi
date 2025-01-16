import NodeCache from "node-cache";
import { config } from "./index.js";

export const cache = new NodeCache({
  stdTTL: config.cache.ttl,
  checkperiod: config.cache.ttl * 0.2,
});
