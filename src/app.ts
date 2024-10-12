import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    next(error);
  }
});

app.all("*", (req: Request, res: Response) => {
  res.send({
    success: false,
    message: "Invalid route",
  });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

export default app;
