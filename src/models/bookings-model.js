import { User, Bike, Hub, Booking, BookingsStatus, BikeStatus, Date } from "../services/database-data.js";

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
            Status: bikeStatus
        };

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

    async bookBike (userID, bikeID, bookingStartDate, bookingEndDate) {
        const self = this;
        let result = {};
        const bike = await self.getBike(bikeID);
        const bikeStatus = _bikeListOperations.validBikeStatuses.booked;
        const bikeStatusID = BikeStatusTypes.indexOf(bikeStatus);

        if (bike.Status == _bikeListOperations.validBikeStatuses.available) {
            const bookingID = _createBooking(bikeID, bikeStatusID, bookingStartDate, bookingEndDate);
            _updateUserBookings(userID, bookingID);
            result.bookingID = bookingID;
        }

        return result;
    }
};

const _createBooking = (bikeID, bikeStatusID, bookingStartDate, bookingEndDate) => {
    const booking = {
        ID: (Booking.length + 1),
        BikeID: bikeID,
        BookingsStatusID: 2,
        DateID: _createDateEntry(bookingStartDate, bookingEndDate)
    }
    _updateBikeStatus(bikeID, bikeStatusID);

    Booking.push(booking);
    return booking.ID;
};

const _createDateEntry = (startDate, endDate) => {
    const date = {
        ID: (Date.length + 1),
        From: startDate,
        To: endDate
    };

    Date.push(date);
    return date.ID;
};

const _updateBikeStatus = (bikeID, bikeStatusID) => {
    for (let bike of Bike) {
        if (bike.ID == bikeID) {
            bike.BikeStatusID = bikeStatusID;
            break;
        }
    }
};

const _updateUserBookings = (userID, bookingID) => {
    const userIndex = User.findIndex((user) => user.ID == userID);
    User[userIndex].BookingsID.push(bookingID);
}

export default bookingsModel;
