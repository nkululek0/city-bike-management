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
    },
    
    async cancelBikeBooking (userID, bookingID) {
        let result;
        // find booking using bookingID from user.BookingsID using userID
        let user = User.find((user) => user.ID == userID);
        if (user && user.BookingsID.indexOf(bookingID) != -1) {
            let booking = Booking.find((possibleBooking) => {
                return possibleBooking.ID == bookingID;
            });
            // update bike status to available and increase bookedTimes
            const bikeStatus = _bikeListOperations.validBikeStatuses.available;
            const bikeStatusID = BikeStatusTypes.indexOf(bikeStatus);
            _updateBikeStatus(booking.BikeID, bikeStatusID, true);

            // update booking.BookingStatusID to cancelled
            _updateUserBookings(userID, bookingID, "update");

            result = {
                bookingID: booking.ID
            };
        }
        return result;
    }
};

const _createBooking = (bikeID, bikeStatusID, bookingStartDate, bookingEndDate) => {
    const booking = {
        ID: (Booking.length + 1),
        BikeID: bikeID,
        BookingStatusID: 1,
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

const _updateBikeStatus = (bikeID, bikeStatusID, increaseBikeBookTimes = false) => {
    for (let bike of Bike) {
        if (bike.ID == bikeID) {
            bike.BikeStatusID = bikeStatusID;
            if (increaseBikeBookTimes) {
                bike.BookedTimes += 1;
            }
            break;
        }
    }
};

const _updateUserBookings = (userID, bookingID, operation = "create") => {
    if (operation && operation == "update") {
        let booking = Booking.find((possibleBooking) => possibleBooking.ID == bookingID);
        booking.BookingStatusID = 2;
    }
    else {
        const userIndex = User.findIndex((user) => user.ID == userID);
        User[userIndex].BookingsID.push(bookingID);
    }
}

export default bookingsModel;
