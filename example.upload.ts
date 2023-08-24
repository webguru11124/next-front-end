//upload example


//index.ts

app.use("/api/v1/upload", uploadrouter);
//should point a media folder in src directory
console.log(path.join(__dirname, "./", "media"))
app.use("/public", express.static(path.join(__dirname, "./", "media")));



//router 


import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import AuthMiddleware from "../middleware/auth";

import { UploadFile, upload } from "../controllers/upload.controller";
import { nextTick } from "process";
import multer from "multer";
import { logger } from "../middleware/logger";

const uploads = upload.single("Image");
const errorChecker = (req: Request, res: Response, next: NextFunction) => {
 
  uploads(req, res, function (err: any) {
    console.log(err);

    if (err instanceof multer.MulterError) {
      next(new Error(err.message ?? "Unknown Error"));
    } else if (err) {
      next(new Error(e.message ?? "Unknown Error"));
    }

    next();
  });
};
router.post("/", AuthMiddleware.VerifyToken, errorChecker, UploadFile);

export router ;





//upload controller




import { randomUUID } from "crypto";

import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
/// should be in src directory
    
//should point a media folder in src directory
console.log(path.join(__dirname, ".,/", "/media"))
    
    cb(null, path.join(__dirname, "../", "/media"));
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = randomUUID() + "." + file.mimetype.split("/")[1];

    cb(null, uniqueSuffix);
  },
});
export const upload = multer({ storage: storage });
export const UploadFile = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "File updated successfully",
    result: req.file?.filename,
  });
  return;
};






//usage




