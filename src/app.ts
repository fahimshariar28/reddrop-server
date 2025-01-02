import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { AuthRouter } from "./app/routes/authRoute";
import cookieParser from "cookie-parser";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    next(error);
  }
});

// All routes
app.use("/api", router);

// Auth routes
app.use("/auth", AuthRouter);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
