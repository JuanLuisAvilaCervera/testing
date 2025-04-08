import Room from "./room";
import { Booking } from "./room";
import Bookings from "./Bookings.json"


const rooms =  [
    {
        name: "Room 1",
        bookings: new Booking(),
        rate: 2000,
        discount: 15,
    }   
] 
describe("Funciones rooms", () => {
    if("Comprobar si isOccupied detecta fechas incorrectas y objetos que no son fechas", () => {
        expect(isOcuppied('')).toThrow();
    })
    it("Comprobar si isOccupied está ocupado en un día determinado", () =>{
        const room = new Room("Room 2", Bookings , 2000 , 15);
        expect(isOcuppied(new Date(2013 , 3 , 3))).toBe(true);
        expect(isOcuppied(new Date(2022, 3, 14))).toBe(false);
    })
    
})