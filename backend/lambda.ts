import app from "./app";
const serverless = require("serverless-http");

// This is the entry point for the Lambda function
export const handler = serverless(app);