import express from "express";
import dashboardController from "../controllers/dashboard-controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", dashboardController.getDashboard);

export default dashboardRouter;