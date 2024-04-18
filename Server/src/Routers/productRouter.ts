import express from "express";
import { checkIsAdmin } from "../Middlewares/authMiddleware";
import { addProductValidate } from "../Middlewares/zodValidationMiddleware";
import multer from "multer";
import { sendImageToS3 } from "../Middlewares/awsMiddleware";
import {
  handleProductImg,
  handleProductAddFormData,
  handleProductIndex,
} from "../Controllers/productController";

const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

productRouter
  .get("/", handleProductIndex)
  .post(
    "/add",
    upload.array("productImage[]"),
    checkIsAdmin,
    addProductValidate,
    handleProductAddFormData,
    sendImageToS3,
    handleProductImg
  );

export default productRouter;