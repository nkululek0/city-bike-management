import express from "express";
import bookingsController from "../controllers/bookings-controller.js";

const router = express.Router();

router.get("/", bookingsController.getBikeList);
router.get("/:userID", bookingsController.getBookings);

export default router;