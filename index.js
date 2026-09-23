import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoDB from "./lib/db.js";
import routes from "./routes/routes.js";

const server = express();

dotenv.config();
server.use(cors());
mongoDB();
server.use(morgan("dev"));
server.use(express.json());
server.use("/api", routes);

server.listen(process.env.PORT || 4000);