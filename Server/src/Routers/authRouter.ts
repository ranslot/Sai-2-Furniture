import express, { Request, Response } from "express";
import { logIn } from "../Controllers/authController";

const authRouter = express.Router();

authRouter
  .post("/login", async (request: Request, response: Response) => {
    console.log(request.body);
    logIn(request, response);
  })
  .post("/register", async (request: Request, response: Response) => {
    return response.send("register post");
  });

export default authRouter;
