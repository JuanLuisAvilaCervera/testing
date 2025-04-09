const {Booking, Room} = require("./index.js");

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
        expect(room.isOccupied(new Date(2013 , 3 , 3))).toBe(false); //SEPARAR
        expect(room.isOccupied(new Date(2022, 9, 10))).toBe(true);
    })
    //OCCUPANCYPERCENTAGE
    it("occupancyPercentage: comprueba si las fechas son correctas", () => {
        const room = new Room("Room 2", bookings , 2000 , 15);
        expect( room.occupancyPercentage('', new Date())).toThrow('Second date is previous or equal to the first date');
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
    })
    it("totalOccupancyPercentage: comprueba que la primera fecha es anterior a la segunda", () => {
        const date1 = new Date(2022, 1, 1)
        const date2 = new Date(2026, 1 , 1)
        expect(Room.totalOccupancyPercentage(rooms, date2, date1)).toThrow();
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
        
        expect(Room.availableRooms(rooms, date1, date2)).toEqual([rooms[0], rooms[2]]);
        expect(Room.availableRooms(rooms, date1, date3)).toEqual([]);
    })
        
})