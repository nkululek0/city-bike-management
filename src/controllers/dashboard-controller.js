import dashboardModel from "../models/dashbaord-model.js";

const dashboardController = {
    getDashboard (req, res) {
        let errorMessage;

        try {
            let data = dashboardModel.getDashboard();
            
            if (data) {
                res.json(data);
            }
            else {
                errorMessage = "There was an issue while proccessing dashboard data";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                error: {
                    message: error
                }
            });
        }
    }
};

export default dashboardController;