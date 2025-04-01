const dashboardModel = {
    getDashboard () {
        let result = {};

        result = {
            cities: [
                {
                    ID: 1,
                    Name: "De Pijp"
                },
                {
                    ID: 2,
                    Name: "Oud-Zuid"
                },
                {
                    ID: 3,
                    Name: "Reguliersgracht"
                },
                {
                    ID: 4,
                    Name: "Damrak"
                }
            ],
            bikes: [
                {
                    ID: 1,
                    Name: "Bike-1",
                    Availability: "available",
                    Location: "De Pijp"
                },
                {
                    ID: 2,
                    Name: "Bike-2",
                    Availability: "un-available",
                    Location: "Oud-Zuid"
                },
                {
                    ID: 3,
                    Name: "Bike-3",
                    Availability: "available",
                    Location: "Reguliersgracht"
                },
                {
                    ID: 4,
                    Name: "Bike-4",
                    Availability: "available",
                    Location: "Damrak"
                }
            ]
        };
        return result;
    }
};

export default dashboardModel;