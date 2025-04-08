import bookingsModel from "../models/bookings-model.js";

const _errorTypes = {
    getBikeList: {
        retrievingBikeList: "There was a problem while trying to retrieve the bike list, please try again"
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
    }
};

export default bookingsController;