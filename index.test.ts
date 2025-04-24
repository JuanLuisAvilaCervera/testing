// const {Booking, Room} = require("./index.ts");

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
        expect(room.isOccupied(new Date(2022, 9, 10))).toBe(true);
    })

    it("Comprobar si isOccupied está libre en un día determinado", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect(room.isOccupied(new Date(2013 , 3 , 3))).toBe(false);
    })

    //OCCUPANCYPERCENTAGE
    it("occupancyPercentage: lanza un error si no existe la primera fecha", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect( room.occupancyPercentage('', new Date())).toThrow('Dates are invalid');
    })

    it("occupancyPercentage: lanza un error si no existe la segunda fecha", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect(room.occupancyPercentage(new Date(), '')).toThrow('Dates are invalid');
    })


    it("occupancyPercentage: lanza un error si las fechas son iguales", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        const date = new Date();
        expect(room.occupancyPercentage(date, date)).toThrow('Dates are invalid');
    })


    it("occupancyPercentage: lanza un error al detectar que la segunda fecha es anterior a la primera", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect(room.occupancyPercentage(new Date(9, 9, 2025), new Date(9,9,2022))).toThrow('Second date is previous or equal to the first date')
    })

    it("OccupancyPercentage: recibe el porcentaje correcto de dias ocupados", () =>{
        const room = new Room("Room 2", bookings , 2000 , 15);
        const date1 = new Date(2023, 9, 1);
        const date2 = new Date(date1);
        date2.setDate(date2.getDate() + 99);

        expect(room.occupancyPercentage(date1, date2)).toBe(4.08)
    })

    it("OccupancyPercentage: recibe 0 cuando no hay ningún dia ocupado", () =>{
        const room = new Room("Room 2", bookings , 2000 , 15);
        const date1 = new Date(2023, 9, 1);
        const date2 = new Date(date1);
        date2.setDate(date2.getDate() + 9);

        expect(room.occupancyPercentage(date1, date2)).toBe(0) 
    })


    //TOTALOCCUPANCYPERCENTAGE

    it("totalOccupancyPercentage: comprueba que no hay habitaciones", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage('' , date1, date2)).toThrow('Invalid data provided');
    })

    it("totalOccupancyPercentage: comprueba que no existe la primera fecha", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage(rooms , '', date2)).toThrow('Invalid data provided');
    })

    it("totalOccupancyPercentage: comprueba que no existe la segunda fecha", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage(rooms , date1, '')).toThrow('Invalid data provided');
    })

    it("totalOccupancyPercentage: comprueba que la primera fecha es anterior a la segunda", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage(rooms, date2, date1)).toThrow('Second date is previous to the first date');
    })

    it("totalOccupancyPercentage: saca el resultado correcto", () => {
        const date1 = new Date(2023, 1, 1)
        const date2 = new Date(2024, 1 , 1)
        expect(Room.totalOccupancyPercentage(rooms, date1, date2)).toBe(1.11); // 4/365
    })

    it("availableRooms: comprueba si existen las habitaciones" , () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.availableRooms('' , date1, date2)).toThrow('Dates are invalid');
    })
    it("availableRooms: comprueba si existe la primera fecha" , () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.availableRooms(rooms , '', date2)).toThrow('Dates are invalid');
    })
    it("availableRooms: comprueba si existe la segunda fecha" , () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.availableRooms(rooms , date1, '')).toThrow('Dates are invalid');
    })


    it("availableRooms: devuelve un array con las rooms disponibles", () => {
        const date1 = new Date(2023, 1, 1)
        const date2 = new Date(2024, 1 , 1)
        
        expect(Room.availableRooms(rooms, date1, date2)).toEqual([rooms[0], rooms[2]]);
    })

    it("availableRooms: no devuelve habitaciones, un array vacio", () => {
        const date1 = new Date(2022, 1, 1)
        const date3 = new Date(2026, 3,1)
        
        expect(Room.availableRooms(rooms, date1, date3)).toEqual([]);
    })
        
})

describe("Funciones de bookings", () => {
    it("get fee: gives correct fee", () => {

        const booking = new Booking('Booking 1', 'email@gmail.com', new Date(2022, 1, 1), new Date(2022, 1, 4), 12, {
            name: 'Room 121',
            rate: 2000,
            discount: '22'
        })

        expect(booking.fee).toBe(1372);
    })
})