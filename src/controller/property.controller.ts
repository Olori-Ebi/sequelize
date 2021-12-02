import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import {
  CREATED_CODE,
  FORBIDDEN_CODE,
  SUCCESS_CODE,
} from "../constants/statusCodes";
// import { ValidatePropertyAd } from "../helper/validator";
import { PropertyQueries } from "../service/property.service";
import cloudinary from "../utils/cloudinary";

export const createAd = async (req: any, res: Response, next: NextFunction) => {
  const { id: owner } = await req.user;
  const validate = await req.body;
  const image = await cloudinary.uploader.upload(req.file?.path);

  const values = {
    id: v4(),
    owner,
    status: validate.status,
    price: validate.price,
    state: validate.state,
    city: validate.city,
    address: validate.address,
    type: validate.type,
    image_url:
      image.url ||
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  };

  const { dataValues } = await PropertyQueries.createAd(values);

  return res.status(CREATED_CODE).json({
    status: CREATED_CODE,
    message: "Property posted",
    data: dataValues,
  });
};

export const getAll = async (req: any, res: Response, next: NextFunction) => {
  if (req.query.type) {
    const { type } = req.query;
    const result: any = await PropertyQueries.getAds(type);
    if (result.error) {
      return res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
    }

    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      data: result.dataValues,
    });
  } else {
    const result: any = await PropertyQueries.getAds();
    if (result.error) {
      return res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      data: result,
    });
  }
};

export const viewAd = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result: any = await PropertyQueries.viewOne(id);
    if (result.error) {
      return res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      data: result[0].dataValues,
    });
  } catch (error) {}
};

export const deleteAd = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id: propertyid } = req.params;
    const { id: owner } = await req.user;
    const result: any = await PropertyQueries.delete(propertyid, owner);
    if (result.error) {
      return res.status(result.error.status).json({
        status: result.error.status,
        error: result.error.message,
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      message: "property removed",
    });
  } catch (error) {}
};

export const sold = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id: owner } = await req.user;
    const { propertyid } = req.params;
    const result: any = await PropertyQueries.sold(owner, propertyid);

    if (result.error) {
      return res.status(FORBIDDEN_CODE).json({
        status: FORBIDDEN_CODE,
        message: "The property you are trying to update is unavailable",
      });
    }
    return res.status(SUCCESS_CODE).json({
      status: SUCCESS_CODE,
      message: "Update successful",
    });
  } catch (error) {}
};

export const updateAd = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = await req.user;

    const { propertyid } = req.params;
    let cloudRes;
    const checker: any = await PropertyQueries.cursor(propertyid);
    if (checker.error) {
      return res.status(404).json({
        status: 404,
        error: "Property could not be found",
      });
    }

    if (checker.dataValues.owner === id) {
      let { price, state, city, address, type, image_url } = checker.dataValues;
      if (req.file?.path) {
        cloudRes = await cloudinary.uploader.upload(req.file?.path);
      }

      const values = {
        price: req.body.price || price,
        state: req.body.state || state,
        city: req.body.city || city,
        address: req.body.address || address,
        type: req.body.type || type,
        url: cloudRes.url || image_url,
        id: propertyid,
        owner: id,
      };

      const result: any = await PropertyQueries.update(values);
      if (result.error) {
        return res.status(404).json({
          status: 404,
          error: "Property could not be found",
        });
      }
      return res.status(SUCCESS_CODE).json({
        status: SUCCESS_CODE,
        message: "Update successful",
      });
    }

    return res.status(403).json({
      status: 403,
      error: "Only the owner of this resources can perform this action",
    });
  } catch (error) {}
};
