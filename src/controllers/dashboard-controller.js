import dashboardModel from "../models/dashboard-model.js";

const dashboardController = {
    async getDashboard (req, res) {
        try {
            let data = await dashboardModel.getDashboard(1);
            
            if (data && typeof data == "object" && Object.entries(data).length > 0) {
                console.log(data);
                res.render("home");
            }
            else {
                let errorMessage = "There was an issue while processing dashboard data";
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