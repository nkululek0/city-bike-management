let User = [
    {
        ID: 1,
        FirstName: "Nkululeko",
        LastName: "Zikode",
        Email: "nkululekovuyo0103@gmail.com",
        Password: "1234",
        BookingsID: []
    }
];

let Hub = [
    {
        ID: 1,
        Location: "De Pijp"
    },
    {
        ID: 2,
        Location: "Oud-Zuid"
    },
    {
        ID: 3,
        Location: "Reguliersgracht"
    },
    {
        ID: 4,
        Location: "Damrak"
    }
];

let Bike = [
    {
        ID: 1,
        Name: "Bike-1",
        PictureURL: "",
        BookedTimes: 2,
        HubID: 1
    },
    {
        ID: 2,
        Name: "Bike-2",
        PictureURL: "",
        BookedTimes: 5,
        HubID: 2
    },
    {
        ID: 3,
        Name: "Bike-3",
        PictureURL: "",
        BookedTimes: 3,
        HubID: 3
    },
    {
        ID: 4,
        Name: "Bike-4",
        PictureURL: "",
        BookedTimes: 1,
        HubID: 4
    },
    {
        ID: 5,
        Name: "Bike-5",
        PictureURL: "",
        BookedTimes: 6,
        HubID: 2
    },
    {
        ID: 6,
        Name: "Bike-6",
        PictureURL: "",
        BookedTimes: 6,
        HubID: 4
    }
];

let Booking = [
    {
        ID: 1,
        BikeID: 2,
        Status: "booked" // available, booked, complete 
    }
];

export { User, Bike, Hub, Booking };