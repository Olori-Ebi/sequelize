import express, { Request, Response } from "express";
import { login, signup } from "../controller/auth.controller";
const Validator = require("../middleware/Validator");

const authRouter = express.Router();

authRouter.post("/signup", Validator("register"), signup);
authRouter.post("/signin", Validator("login"), login);

export default authRouter;
