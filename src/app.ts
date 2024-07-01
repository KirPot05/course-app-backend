import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { NODE_ENV, PORT } from "./config/constants";
import { authRoutes } from "./routes";
import { connectDB } from "./utils/db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", true);

// CORS:
app.use(
  cors({
    origin: "*",
  })
);

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server working!" });
});

app.get("/*", (req: Request, res: Response, next: NextFunction) => {
  if (req.url.includes("api")) {
    // If the URL contains 'api', proceed to the next middleware.
    next();
  } else {
    // If the URL does not contain 'api', serve the static HTML file.
    return res
      .status(404)
      .json({ success: false, message: "Resource not found" });
  }
});

// Listen:
async function main() {
  try {
    await connectDB();

    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    process.on("uncaughtException", (err: any) => {
      console.log("Uncaught Exception, shutting down...");
      console.log(err.name, err.message);
      process.exit(1);
    });

    process.on("unhandledRejection", (err: any) => {
      console.log("Unhandled Rejection, shutting down...");
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

main();
