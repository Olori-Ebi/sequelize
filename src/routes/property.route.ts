import express, { Request, Response } from "express";
import {
  createAd,
  deleteAd,
  getAll,
  sold,
  updateAd,
  viewAd,
} from "../controller/property.controller";
import { verifyUser } from "../middleware/Authentication";
import upload from "../utils/multer";
const Validator = require("../middleware/Validator");

const propertyRouter = express.Router();

propertyRouter.post(
  "/",
  verifyUser,
  upload.single("image_url"),
  Validator("validateAd"),
  createAd
);
propertyRouter.route("/").get(getAll);
propertyRouter.route("/:id").get(viewAd);
propertyRouter.route("/:id").delete(verifyUser, deleteAd);
propertyRouter.route("/:propertyid").patch(verifyUser, sold);
propertyRouter
  .route("/:propertyid/update")
  .patch(verifyUser, upload.single("image_url"), updateAd);

export default propertyRouter;
