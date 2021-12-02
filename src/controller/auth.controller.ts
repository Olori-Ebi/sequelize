import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import {
  CREATED_CODE,
  ERROR_CODE,
  SUCCESS_CODE,
} from "../constants/statusCodes";
import Errors from "../helper/error";

import { hashPassword } from "../helper/helperUtils";
// import { ValidateLogin, ValidateRegister } from "../validator/validator";
import { AuthQueries } from "../service/auth.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await req.body;
    console.log(validate);

    const hashedPassword = await hashPassword(validate.password);

    const values = {
      id: v4(),
      first_name: validate.first_name,
      last_name: validate.last_name,
      email: validate.email,
      password: hashedPassword,
      phoneNumber: validate.phoneNumber,
      address: validate.address,
    };

    const result = await AuthQueries.create(values);
    if (result.error) {
      res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
      return;
    }
    return res.status(CREATED_CODE).json({
      status: CREATED_CODE,
      message: "User successfully created",
      data: req.body,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return Errors.joiErrorResponse(res, error);
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = await req.body;
    const values = { email: validate.email, password: validate.password };

    const result = await AuthQueries.login(values);

    if (result.error) {
      res.status(ERROR_CODE).json({
        status: ERROR_CODE,
        error: result.error.message,
      });
      return;
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      result,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return Errors.joiErrorResponse(res, error);
    }
    next(error);
  }
};
