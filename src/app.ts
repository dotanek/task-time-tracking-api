import express, { Application, Request, Response, NextFunction } from "express";
import ResponseError from "./utilities/responseError";

import taskRoute from "./routes/taskRoute";

/* Application setup */
const app: Application = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.use("/api/task", taskRoute);

/* No route found */
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: ResponseError = new ResponseError("Not found", 404);
  next(error);
});

/* Error handling */
app.use(
  (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
    });
  }
);

export default app;
