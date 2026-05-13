import { createClient } from 'redis';
import { env } from './env';

export const redisClient = env.REDIS_URL ? createClient({ url: env.REDIS_URL }) : null;

if (redisClient) {
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('connect', () => console.log('Redis Connected'));
  // Connect asynchronously without blocking startup
  redisClient.connect().catch(console.error);
} else {
  console.log('Redis URL not provided, skipping Redis initialization');
}
