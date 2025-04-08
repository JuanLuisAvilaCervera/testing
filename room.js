
export default class Room {
    constructor(name, bookings , rate , discount){
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;

    }

    isOccupied = (date) => {
        return false
    }

    occupancyPercentage = (startDate, endDate) => {

        return 0;
    }

    static totalOccupancyPercentage = (rooms , startDate, endDate) => {
        return 0;
    }

    static availableRooms = (rooms , startDate , endDate) => {
        return [];
    }
}

export class Booking {
    constructor(name , email, checkin, checkout, discount, room){
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }

    get fee(){
        return 0;
    }
}