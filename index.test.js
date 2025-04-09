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
const bookings = [
    {
        name: "Booking 1",
        email: "email@gmail.com",
        checkin: new Date(2022, 9, 9),
        checkout: new Date ( 2022, 9 , 13),
        discount: 25,
    },
    {
        name: "Booking 2",
        email: "email@gmail.com",
        checkin: new Date(2023, 9, 29),
        checkout:new Date(2023, 10, 2),
        discount: 20,

    },
    {
        name: "Booking 3",
        email: "email@gmail.com",
        checkin: new Date(2024, 9, 29),
        checkout:new Date(2024, 10, 2),
        discount: 20,

    }
]
const rooms =  [
    new Room("Room 1",[bookings[0]],2000,15),
    new Room("Room 2",[bookings[1], bookings[2]],2000,15)
]

describe("Funciones rooms", () => {
    it("Comprobar si isOccupied detecta fechas incorrectas y objetos que no son fechas", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);

        expect( () => room.isOccupied('')).toThrow();
    })
    it("Comprobar si isOccupied está ocupado en un día determinado", () =>{
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect(room.isOccupied(new Date(2013 , 3 , 3))).toBe(false);
        expect(room.isOccupied(new Date(2022, 9, 10))).toBe(true);
    })
    //OCCUPANCYPERCENTAGE
    it("occupancyPercentage: comprueba si las fechas son correctas", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect( room.occupancyPercentage('', new Date())).toThrow();
        expect(room.occupancyPercentage(new Date(), '')).toThrow();
        expect(room.occupancyPercentage('', '')).toThrow();
        expect(room.occupancyPercentage(new Date(2022,1,1), new Date(2023,1,1))).not.toThrow();
    })
    it("occupancyPercentage: comprueba si la primera fecha es anterior a la segunda", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect(room.occupancyPercentage(new Date(9, 9, 2025), new Date(9,9,2022))).toThrow()
    })
    it("occupancyPercentage: comprueba si envía el porcentaje correcto", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        const date1 = new Date(2023, 9, 1);
        const date2 = new Date(date1);
        const date3 = new Date(date1);
        const date4 = new Date(date1)
        date2.setDate(date2.getDate() + 99);
        date3.setDate(date3.getDate() + 9)
        date4.setDate(date4.getDate() + 30);

        expect(room.occupancyPercentage(date1, date2)).toBe(4.08) // 4 / 100 dias
        expect(room.occupancyPercentage(date1, date3)).toBe(0) // 0 / 10 dias
        expect(room.occupancyPercentage(date1, date4)).toBe(6.8) // 2 / 31
    })
    //TOTALOCCUPANCYPERCENTAGE
    it("totalOccupancyPercentage: comprueba si todos los datos son correctos", () =>{
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage('' , date1, date2)).toThrow();
        expect(Room.totalOccupancyPercentage(rooms, '', date2)).toThrow();
        expect(Room.totalOccupancyPercentage(rooms , date1, '')).toThrow();
        expect(Room.totalOccupancyPercentage(rooms , date1, date2)).not.toThrow();
    })
    it("totalOccupancyPercentage: comprueba que la primera fecha es anterior a la segunda", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage(rooms, date1, date2)).not.toThrow();
        expect(Room.totalOccupancyPercentage(rooms, date2, date1)).not.toThrow();
    })
    it("totalOccupancyPercentage: saca el resultado correcto", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        const date3 = new Date(2023, 1,1)
        expect(Room.totalOccupancyPercentage(rooms, date1, date2)).toBe(0.82);
        expect(Room.totalOccupancyPercentage(rooms, date1, date3)).toBe(1.1);
    })
    it("availableRooms: comprueba si todos los datos son correctos" , () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.availableRooms('' , date1, date2)).toThrow();
        expect(Room.availableRooms(rooms, '', date2)).toThrow();
        expect(Room.availableRooms(rooms , date1, '')).toThrow();

    })
    it("availableRooms: devuelve un array con las rooms disponibles", () => {
        const date1 = new Date(2023, 1, 1)
        const date2 = new Date(2024, 1 , 1)
        const date3 = new Date(2023, 3,1)
        
        expect(Room.availableRooms(rooms, date1, date2)).toBe([rooms[0], rooms[2]]);
        expect(Room.availableRooms(rooms, date1, date3)).toBe([]);
    })
        

})