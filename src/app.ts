import express, { NextFunction, Response, Request, Application } from "express";
import morgan from "morgan";
import { ERROR_CODE } from "./constants/statusCodes";
import { NOT_FOUND } from "./constants/statusMessage";
import authRouter from "./routes/auth.route";
import propertyRouter from "./routes/property.route";

const app: Application = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/property", propertyRouter);

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(NOT_FOUND);
  error.status = ERROR_CODE;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// listen
app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

export default app;
