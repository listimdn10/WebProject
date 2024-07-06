import mongoose from "mongoose";

//passenger's name, departure, arrival, flight time, gate, seat, 
const ticketSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, //remember this comma 
    departure: {
        type: String, 
        required: true, 
    }, 
    arrival:{
        type: String, 
        required: true,
    },
    class: {
        type: String, 
        required: true,
    },
    },
    {
        timestamps: true, 
    }
)


//using export keyword so that i can use 
//it in another file 
export const Ticket = mongoose.model('Ticket', ticketSchema);
 