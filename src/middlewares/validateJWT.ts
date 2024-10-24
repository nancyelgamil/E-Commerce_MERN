import {  Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";


const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1]; // bearer

  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(token, "v87B7#2#^^`fG(D", async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid token Payload");
      return;
    }

    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };
    //Fetch User from database based on the payload
    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user;
    next();
  });
};

export default validateJWT;
