import { User, Booking, BookingsStatus, Date, Bike } from "../services/database-data.js";

const dashboardModel = {
    async getDashboard (userID) {
        let result = {
            user: null,
            booking: null,
            bike: null
        };
        let user = await _userOperations.getCurrentUser(userID);

        if (user.BookingsID.length > 0) {
            let booking = await _bookingOperations.getCurrentOngoingBooking(user.BookingsID);
            result.booking = booking;

            let bike = await _bikeOperations.getCurrentlyBookedBiked(booking.BikeID);
            result.bike = bike;
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
                    const date = await _DateOperations.getCurrentBookingDate(booking.DateID);
                    booking.date = date;
                    result = booking;
                }
            });
        }
        return result;
    }
};

const _DateOperations = {
    async getCurrentBookingDate (dateID) {
        return Date.find((date) => date.ID == dateID);
    }
};

const _bikeOperations = {
    async getCurrentlyBookedBiked (bikeID) {
        let result = {};

        if (bikeID) {
            result = Bike.find((bike) => bike.ID == bikeID);
        }

        return result;
    }
};

export default dashboardModel;