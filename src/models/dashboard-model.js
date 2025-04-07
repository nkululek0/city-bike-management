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
                BookedTimes: 2,
                Location: "De Pijp"
            },
            {
                ID: 3,
                Name: "Bike-3",
                BookedTimes: 3,
                Location: "Reguliersgracht"
            },
            {
                ID: 4,
                Name: "Bike-4",
                BookedTimes: 1,
                Location: "Damrak"
            }
        ],
        booked: [
            {
                ID: 2,
                Name: "Bike-2",
                BookedTimes: 5,
                Location: "Oud-Zuid"
            },
        ],
        maintenance: [
            {
                ID: 5,
                Name: "Bike-5",
                BookedTimes: 6,
                Location: "Oud-Zuid"
            },
            {
                ID: 6,
                Name: "Bike-6",
                BookedTimes: 6,
                Location: "Damrak"
            },
        ]
    }
};

const dashboardModel = {
    getDashboard () {
        let result = data;

        return result;
    }
};

export default dashboardModel;