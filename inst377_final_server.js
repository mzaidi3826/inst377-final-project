// server.js
import express from "express";
import checkEmailHandler from "./api/check-email.js"; // your handler
import path from "path";

const app = express();
const PORT = 3000;

// Serve front-end files
app.use(express.static(path.join(path.resolve(), "public")));

// API endpoint
app.get("/api/check-email", checkEmailHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
