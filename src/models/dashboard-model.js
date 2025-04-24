import { User, Booking, BookingsStatus, Date as BookingDate, Bike, Hub } from "../services/database-data.js";

const dashboardModel = {
    async getDashboard (userID) {
        let result = {
            user: null,
            booking: null,
            bike: null
        };
        let user = await _userOperations.getCurrentUser(userID);

        if (user.BookingsID.length > 0) {
            result.booking = await _bookingOperations.getCurrentOngoingBooking(user.BookingsID);

            result.bike = await _bikeOperations.getCurrentlyBookedBiked(result.booking.BikeID);
        }
        delete user.BookingsID;

        result.user = user;

        return result;
    }
};

/**
 * Values of BookingStatusTypes will be:
 * ["", "booked", "cancelled", "completed"]
 */
const BookingStatusTypes = [""];
BookingsStatus.forEach((status) => {
    BookingStatusTypes[status.ID] = status.Value;
});

const _userOperations = {
    async getCurrentUser (userID) {
        let result;
        let user = await User.find((possibleUser) => possibleUser.ID == userID);
        result = {
            ID: user.ID,
            FirstName: user.FirstName,
            LastName: user.LastName,
            ProfilePictureURL: user.ProfilePictureURL,
            Email: user.Email,
            BookingsID: user.BookingsID
        }
        
        return result;
    }
};

const _bookingOperations = {
    validBookingsStatuses: {
        booked: BookingStatusTypes[1],
        cancelled: BookingStatusTypes[2],
        complete: BookingStatusTypes[3],
    },

    async getCurrentOngoingBooking (bookingsID) {
        const self = this;
        let result = {};

        if (bookingsID.length > 0) {
            const bookedStatusID = BookingStatusTypes.indexOf(self.validBookingsStatuses.booked);

            bookingsID.forEach(async (booking) => {
                let currentBooking = Booking.find((possibleBooking) => possibleBooking.ID == booking);

                if (currentBooking.BookingStatusID == bookedStatusID) {
                    const date = _DateOperations.getCurrentBookingDate(currentBooking.DateID);
                    result = {
                        ID: currentBooking.ID,
                        BikeID: currentBooking.BikeID,
                        BookingStatusID: currentBooking.BookingStatusID,
                        DateID: currentBooking.DateID,
                        Date: date
                    };
                }
            });
        }
        return result;
    }
};

const _DateOperations = {
    getCurrentBookingDate (dateID) {
        const self = this;
        let result = {};
        const date = BookingDate.find((date) => date.ID == dateID);
        result = self._extractDate(date);
        
        return result;
    },

    _extractDate (date) {
        let result = {};
        let startDateObj = new Date(date.From);
        result.From = formatDate(startDateObj);

        let endDateObj = new Date(date.To);
        result.To = formatDate(endDateObj);

        function formatDate (dateObj) {
            let dateString = dateObj.toDateString();
            let startTime = dateObj.toLocaleTimeString().slice(0, -3);

            return dateString.concat("-", startTime);
        };
        return result;
    }
};

const _bikeOperations = {
    async getCurrentlyBookedBiked (bikeID) {
        let result = {};

        if (bikeID) {
            const bike = await Bike.find((bike) => bike.ID == bikeID);
            const hub = await Hub.find((hub) => hub.ID == bike.HubID);
            
            result = {
                ID: bike.ID,
                Name: bike.Name,
                PictureURL: bike.PictureURL,
                Hub: hub.Name
            }
        }

        return result;
    }
};

export default dashboardModel;