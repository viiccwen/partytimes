import app from "./app";

const API_PORT = process.env.API_PORT || 3000;

// Start the server
app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}`);
});
