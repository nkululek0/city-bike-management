import { User, Bike, Hub, Booking, BookingsStatus, BikeStatus } from "../services/database-data.js";

/**
 * Values of BikeStatusTypes will be:
 * ["", "available", "booked", "maintenance"]
 */
const BikeStatusTypes = [""];
BikeStatus.forEach((status) => {
    BikeStatusTypes[status.ID] = status.Value;
});

const _bikeListOperations = {
    validBikeStatuses: {
        available: BikeStatusTypes[1],
        booked: BikeStatusTypes[2]
    },
    updateBikeStatus (bike, bikeStatus) {
        let result = {
            ID: bike.ID,
            Name: bike.Name,
            PictureURL: bike.PictureURL,
            BookedTimes: bike.BookedTimes,
            HubID: bike.HubID,
            Status: ""
        };

        result.Status = bikeStatus;

        return result;
    }
}

const bookingsModel = {
    async getHubList () {
        let result = [];

        result = Hub;
        return result;
    },

    async getBikeList () {
        let result = [];
        let Bikes = Bike;

        Bikes.forEach((bike) => {
            let bikeStatus = BikeStatusTypes[bike.BikeStatusID];

            if (_bikeListOperations.validBikeStatuses.hasOwnProperty(bikeStatus)) {
                let updatedBike = _bikeListOperations.updateBikeStatus(bike, bikeStatus);

                result.push(updatedBike);
            }
        });

        return result;
    },

    async getBike (bikeID) {
        const self = this;
        let result;
        const bike = (await self.getBikeList()).find((bike) => bike.ID == bikeID);

        if (bike) {
            result = bike;
        }
        else {
            throw new Error("Could not find bike with that ID");
        }

        return result;
    },

    async bookBike (bikeID, userID, bookingStartDate, bookingEndDate) {
        const self = this;
        let result = "";
        const bike = await self.getBike(bikeID);

        return result;
    }
};

export default bookingsModel;