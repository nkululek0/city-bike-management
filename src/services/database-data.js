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
];

let Bike = [
    {
        ID: 1,
        Name: "Bike-1",
        PictureURL: "/bike-1.png",
        BookedTimes: 2,
        HubID: 2,
        BikeStatusID: 1
    },
    {
        ID: 2,
        Name: "Bike-2",
        PictureURL: "/bike-2.png",
        BookedTimes: 5,
        HubID: 2,
        BikeStatusID: 2
    },
    {
        ID: 3,
        Name: "Bike-3",
        PictureURL: "/bike-3.png",
        BookedTimes: 3,
        HubID: 3,
        BikeStatusID: 1
    },
    {
        ID: 4,
        Name: "Bike-4",
        PictureURL: "/bike-4.png",
        BookedTimes: 1,
        HubID: 4,
        BikeStatusID: 1
    },
    {
        ID: 5,
        Name: "Bike-5",
        PictureURL: "/bike-5.png",
        BookedTimes: 6,
        HubID: 2,
        BikeStatusID: 3
    },
    {
        ID: 6,
        Name: "Bike-6",
        PictureURL: "/bike-6.png",
        BookedTimes: 6,
        HubID: 4,
        BikeStatusID: 3
    }
];

const BikeStatus = [
    {
        ID: 1,
        Value: "available"
    },
    {
        ID: 2,
        Value: "booked"
    },
    {
        ID: 3,
        Value: "maintenance"
    }
];

let Booking = [
    {
        ID: 1,
        BikeID: 2,
        BookingStatusID: 1,
        DateID: 1
    }
];

const BookingsStatus = [
    {
        ID: 1,
        Value: "booked"
    },
    {
        ID: 2,
        Value: "cancelled"
    },
    {
        ID: 3,
        Value: "completed"
    }
];

let Date = [
    {
        ID: 1,
        From: "Fri Apr 11 2025 11:00:57 GMT+0200 (South Africa Standard Time)",
        To: "Fri Apr 25 2025 17:30:00 GMT+0200 (South Africa Standard Time)"
    }
];

/**
 * When setting a new date
 * Use:
 *  let date = new Date("2025-03-25") //
 *  date.setFullYear(2025, 04, 18) // When updating the date (Please note that the month is zero based like array indexes)
 *  date.setHours(20,18) // When updating the time
 *  date.toString() // To retrieve the format of the date of which it will be stored in
 *  date.getTime() Returns date in a number format so that comparisons can be made with other dates
 */

export { User, Bike, Hub, Booking, BookingsStatus, BikeStatus, Date };