const dashboardModel = {
    getDashboard () {
        let result = [];

        result = {
            cities: ["De Pijp", "Oud-Zuid", "Reguliersgracht", "Damrak"],
            bikes: [
                {
                    code: 1,
                    availability: "available",
                    location: "De Pijp"
                },
                {
                    code: 2,
                    availability: "un-available",
                    location: "Oud-Zuid"
                },
                {
                    code: 3,
                    availability: "available",
                    location: "Reguliersgracht"
                },
                {
                    code: 4,
                    availability: "available",
                    location: "Damrak"
                }
            ]
        };
        return result;
    }
};

export default dashboardModel;