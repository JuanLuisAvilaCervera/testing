class Room {

    private name : string;
    private bookings : {
        name: number,
        email: string,
        checkin: Date,
        checkout: Date,
        discount: number
    }[];
    private rate : number;
    private discount : number;


    constructor(name : string, bookings : {name: number,email: string, checkin: Date,checkout: Date, discount: number}[],
         rate : number , discount : number){
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;

    }

    isOccupied = (date : Date) => {
        if(date instanceof Date && !notanumber(date)){
            let matchingBookings = this.bookings.filter((booking) => Number(date) - Number(booking.checkin) >= 0 && Number(date) - Number(booking.checkout) <= 0)

            return matchingBookings.length > 0;

        }else{
            throw new Error("Variable introduced is not a valid date")
        }
    }

    occupancyPercentage = (startDate : Date, endDate : Date) => {
        if(startDate instanceof Date && endDate instanceof Date && !notanumber((startDate)) && !notanumber((endDate))){
            if(compareDates(startDate, endDate) < 0){

                let daySum = 0;

                for(let i = 0 ; i < this.bookings.length ; i++){
                    const booking = this.bookings[i]
                    if(Number(endDate) - Number(booking.checkout) < 0 && Number(endDate) - Number(booking.checkin) > 0){
                        let initial:Date;
                        let final:Date;

                        if(Number(booking.checkin) - Number(startDate) > 0 ){
                            initial = booking.checkin;
                        }else{
                            initial = startDate;
                        }
                        if(Number(endDate) - Number(booking.checkout) > 0){
                            final = booking.checkout;
                        }else{
                            final = endDate;
                        }
                        daySum += Number(final) - Number(initial);
                    }
                }
                return (daySum / (Number(endDate) - Number(startDate)) < 1 ? parseFloat((daySum / (Number(endDate) - Number(startDate)) * 100).toFixed(2)) : 1)
            }else
                throw new Error('Second date is previous or equal to the first date')
        }else
            throw new Error('Invalid dates')
        
    }

    static totalOccupancyPercentage = (rooms : Room[] , startDate : Date, endDate : Date) => {
        if(rooms.length > 0 && startDate instanceof Date && !notanumber((startDate)) && endDate instanceof Date && !notanumber((endDate))){

            if(compareDates(startDate, endDate) > 0){
                let totalPercentage = 0;
                for(let j = 0 ; j < rooms.length ; j++){
                    totalPercentage += rooms[j].occupancyPercentage(startDate, endDate)
                }
                return totalPercentage;
            }else
                throw new Error('Second date is previous to the first date')
        }else
            throw new Error('Invalid data provided')
    }

    static availableRooms = (rooms : Room[] , startDate : Date , endDate : Date) => {
        if(rooms.length > 0 && startDate instanceof Date && !notanumber((startDate)) && endDate instanceof Date && !notanumber((endDate))){

            if(compareDates(startDate, endDate) > 0){
                const availableRooms : Room[] = [];
                for(let j : number = 0 ; j < rooms.length ; j++){
                    if( rooms[j].occupancyPercentage(startDate, endDate) === 0){
                        availableRooms.push(rooms[j]);
                    }
                }
                return availableRooms;
            }else
                throw new Error('Second date is previous to the first date')
        }else
            throw new Error('Invalid data provided')
    }
}

class Booking {
    private name : string;
    private email: string;
    private checkin : Date;
    private checkout : Date;
    private discount : number;
    private room : { name : string , rate: number ,  discount : number};
    constructor(name : string , email : string, checkin : Date , checkout : Date , discount : number, room : {name : string , rate : number , discount : number }){
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }

    get fee(){
        return Math.floor(this.room.rate * (1 - this.discount /100) * (1- this.room.discount / 100));
    }
}

const compareDates = (date1 : Date, date2 : Date) => {
    return Number(date1) - Number(date2);
}

const notanumber = (date : Date) => {
    return isNaN(Number(date));
}

module.exports = {Booking, Room};