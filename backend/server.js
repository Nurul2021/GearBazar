/**
 * Server Entry Point
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const http = require("http");
const config = require("./server/config");
const routes = require("./server/routes");
const {
  errorHandler,
  notFoundHandler,
} = require("./server/middleware/errorHandler");
const { initializeSocket } = require("./server/services/SocketService");

const app = express();
const server = http.createServer(app);

initializeSocket(server);

const corsOptions = {
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Debug middleware
app.use((req, res, next) => {
  console.log(
    `>>> ${req.method} ${req.url} content-type: ${req.headers["content-type"]} body: ${JSON.stringify(req.body)}`,
  );
  next();
});

if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = 5003;

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("✓ MongoDB connected");
  } catch (error) {
    console.error("✗ MongoDB error:", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`  API: http://localhost:${PORT}/api`);
  });
};

startServer();
module.exports = app;
