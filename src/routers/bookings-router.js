import express from "express";
import bookingsController from "../controllers/bookings-controller.js";

const router = express.Router();

router.get("/hub", bookingsController.getHubList);
router.get("/bike", bookingsController.getBikeList);
router.get("/:userID", bookingsController.getBookings);

router.post("/:userID/:bikeID", bookingsController.bookBike);

router.patch("/cancel-booking/:userID/:bookingID", bookingsController.cancelBikeBooking);

export default router;