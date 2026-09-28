import express from "express";
import authRouter from "./lib/auth.js";

const routes = express.Router();

routes.use("/auth", authRouter);

export default routes;