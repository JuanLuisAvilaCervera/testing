class Room {
    constructor(name, bookings , rate , discount){
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;

    }

    isOccupied = (date) => {
        if(date instanceof Date && !isNaN(date)){
            let matchingBookings = this.bookings.filter((booking) => date - booking.checkin >= 0 && date - booking.checkout <= 0)

            return matchingBookings.length > 0;

        }else{
            throw new Error("Variable introduced is not a valid date")
        }
    }

    occupancyPercentage = (startDate, endDate) => {
        if(startDate instanceof Date && endDate instanceof Date && !isNaN(startDate) && !isNaN(endDate)){
            if(startDate - endDate < 0){

                let daySum = 0;

                for(let i = 0 ; i < this.bookings.length ; i++){
                    const booking = this.bookings[i]
                    if(startDate - booking.checkout < 0 && endDate - booking.checkin > 0){
                        let initial = 0;
                        let final = 0;

                        if(booking.checkin - startDate > 0 ){
                            initial = booking.checkin;
                        }else{
                            initial = startDate;
                        }
                        if(endDate - booking.checkout > 0){
                            final = booking.checkout;
                        }else{
                            final = endDate;
                        }
                        daySum += final - initial;
                    }
                }
                return (daySum / (endDate - startDate) < 1 ? parseFloat((daySum / (endDate - startDate) * 100).toFixed(2)) : 1)
            }else
                throw new Error('Second date is previous or equal to the first date')
        }else
            throw new Error('Invalid dates')
        
    }

    static totalOccupancyPercentage = (rooms , startDate, endDate) => {
        if(rooms.length > 0 && startDate instanceof Date && !isNaN(startDate) && endDate instanceof Date && !isNaN(endDate)){

            if(endDate - startDate > 0){
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

    static availableRooms = (rooms , startDate , endDate) => {
        if(rooms.length > 0 && startDate instanceof Date && !isNaN(startDate) && endDate instanceof Date && !isNaN(endDate)){

            if(endDate - startDate > 0){
                const availableRooms = [];
                for(let j = 0 ; j < rooms.length ; j++){
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

module.exports = {Booking, Room};