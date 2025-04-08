import { User, Bike, Hub, Booking } from "../services/database-data.js";

const bookingsModel = {
    async getBikeList () {
        let result = {};

        let bookedBikesIDs = Booking.map((booking) => booking.BikeID);
        let availableBikes = bookedBikesIDs.map((bikeID) => {
            return Bike.filter((bike) => bike.ID != bikeID);
        });
        let bookedBikes = bookedBikesIDs.map((bikeId) => {
            return Bike.filter((bike) => bike.ID == bikeId);
        });

        result.availableBikes = availableBikes;
        result.bookedBikes = bookedBikes;
        return result;
    }
};

export default bookingsModel;