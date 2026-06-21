import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], // Track based on clerk userId
  rules: [
    // Rate limit: 10 requests per hour per user
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 tokens
      interval: 3600, // every hour
      capacity: 10, // max 10 tokens
    }),
  ],
});

export default aj;
