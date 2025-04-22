import bookingsModel from "../models/bookings-model.js";

const _errorTypes = {
    getBikeList: {
        retrievingBikeList: "There was a problem while trying to retrieve the bike list, please try again"
    },
    bookBike: {
        invalidBikeID: "No bike ID or invalid bike ID provided, please try again",
        invalidUserID: "No user ID or invalid user ID provided, please try again",
        missingStartDate: "Booking start date is missing, please enter that information and try again",
        missingEndDate: "Booking end date is missing, please enter that information and try again",
        noBikeFound: "Could not find bike with that ID"
    }
};

const bookingsController = {
    async getBookings (req, res) {
        let userID = Number(req.params.userID);

        try {
            if (userID) {

            }
            else {
                throw new Error("Invalid user ID provided");
            }
        }
        catch (error) {
            res.json({
                error: {
                    message: error.message
                }
            });
        }
    },

    async getHubList (req, res) {
        try {
            let hubList = await bookingsModel.getHubList();

            if (hubList) {
                res.json({
                    hubs: hubList
                });
            }
        }
        catch (error) {
            res.json({
                error: {
                    message: error.message
                }
            });
        }
    },

    async getBikeList (req, res) {
        const getBikeListErrors = _errorTypes.getBikeList;

        try {
            let bikeList = await bookingsModel.getBikeList();

            if (bikeList) {
                res.json({
                    bikes: bikeList
                });
            }
            else {
                throw new Error(getBikeListErrors.retrievingBikeList);
            }
        }
        catch (error) {
            const currentError = error.message;
            let responseStatus = null;

            if (currentError == getBikeListErrors.retrievingBikeList) {
                responseStatus = res.status(502);
            }

            const responseJSON = {
                error: {
                    message: error.message
                }
            };
            
            if (responseStatus) {
                responseStatus.json(responseJSON);
            }
            else {
                res.json(responseJSON);
            }
        }
    },

    async bookBike (req, res) {
        const bookBikeErrors = _errorTypes.bookBike;

        try {
            let userID = Number(req.params.userID);
            let bikeID = Number(req.params.bikeID);
    
            if (!bikeID) {
                throw new Error(bookBikeErrors.invalidBikeID);
            }
            if (!userID) {
                throw new Error(bookBikeErrors.invalidUserID);
            }
    
            let { startDate, endDate } = req.body;
    
            if (!startDate) {
                throw new Error(bookBikeErrors.missingStartDate);
            }
            if (!endDate) {
                throw new Error(bookBikeErrors.missingEndDate);
            }

            let bookedBike = await bookingsModel.bookBike(userID, bikeID, startDate, endDate);

            if (bookedBike.hasOwnProperty("bookingID")) {
                res.json({
                    message: "Biked Booked Successfully"
                });
            }

        }
        catch (error) {
            const currentError = error.message;
            let responseStatus = null;

            switch (currentError) {
                case bookBikeErrors.invalidBikeID || bookBikeErrors.invalidUserID || bookBikeErrors.missingStartDate || bookBikeErrors.missingEndDate:
                    responseStatus = res.status(400);
                    break;
                case bookBikeErrors.noBikeFound:
                    responseStatus = res.status(404);
                    break;
                default:
                    responseStatus = res.status(500);
            }

            const responseJSON = {
                error: {
                    message: error.message
                }
            };

            responseStatus.json(responseJSON);
        }
    }
};

export default bookingsController;