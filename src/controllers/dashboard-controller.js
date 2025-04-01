import dashboardModel from "../models/dashboard-model.js";

const dashboardController = {
    getDashboard (req, res) {
        try {
            let data = dashboardModel.getDashboard();
            
            if (data && typeof data == "object" && Object.entries(data).length > 0) {
                res.json(data);
            }
            else {
                let errorMessage = "There was an issue while proccessing dashboard data";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                error: {
                    message: error.message
                }
            });
        }
    }
};

export default dashboardController;