let data = {
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
    bikes: {
        available: [
            {
                ID: 1,
                Name: "Bike-1",
                Available: true,
                Location: "De Pijp"
            },
            {
                ID: 3,
                Name: "Bike-3",
                Available: true,
                Location: "Reguliersgracht"
            },
            {
                ID: 4,
                Name: "Bike-4",
                Available: true,
                Location: "Damrak"
            }
        ],
        unAvailable: [
            {
                ID: 2,
                Name: "Bike-2",
                Available: false,
                Location: "Oud-Zuid"
            },
        ]
    }
};

const dashboardModel = {
    getDashboard () {
        let result = data.bikes;

        return result;
    }
};

export default dashboardModel;