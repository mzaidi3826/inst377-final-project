import dotenv from "dotenv";
dotenv.config(); // Only once, at the very top

import express from "express";
import path from "path";
import checkEmailHandler from "./api/inst377_check_email.js";
import recentChecksHandler from "./api/recent_checks.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(path.resolve(), "public")));

// API endpoints
app.get("/api/check-email", checkEmailHandler);
app.get("/api/email-checks", recentChecksHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
