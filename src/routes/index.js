import express from "express";
import weatherRoutes from "./weatherRoutes.js";

const routes = express.Router();

routes.use("/weather", weatherRoutes);

export default routes;
