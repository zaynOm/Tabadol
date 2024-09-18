import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validator = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).array();
  console.log("validations:", result);
  if (result.length) {
    return res.status(422).json({ error: result[0].msg });
  }

  next();
};

export default validator;
