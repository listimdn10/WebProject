import express, { response } from "express"; 
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Ticket } from "./dtb_models/ticketModel.js";


const app = express();
 //make it listen to a port, separate your code to different files and folders

//middleware for parsing request body 
app.use(express.json());

app.get('/', (request, response)=> {
    console.log(response)
    return response.status(200).send('welcome to MERN ')
});

//Route for save/post/send a new ticket to server/dtb
//bcs working with mongoose is an asynchronous process we use async 
//our callback functions
app.post('/tickets', async (request, response)=> {
    try{
        if(
            !request.body.name ||
            !request.body.departure ||
            !request.body.arrival ||
            !request.body.class
        ){
            return response.status(400).send({
                messgae: "pls send all required data fields",
            });
        }
        const newTicket = {
            name: request.body.name, 
            departure: request.body.departure, 
            arrival: request.body.arrival, 
            class: request.body.class, 
        };
        const ticket = await Ticket.create(newTicket);

        return response.status(201).send(ticket);
    }catch(error){
        console.log(error.message); 
        response.status(500).send({message: error.message});
    }
});

//route to GET ALL bookS from dtb 
app.get('/tickets', async (request, response)=>{
    try {
        const tickets = await Ticket.find({});
        return response.status(200).json({
            count: tickets.length,
            data: tickets
        })
    } catch (error){
        console.log(error.message); 
        response.status(500).send({ message: error.message});
    }
}); 


//route to GET ONE tickets from dtb BY ID
app.get('/tickets/:id', async (request, response)=>{ //the /:id required to place id when search in postman
    try {
        const { id } = request.params; //to extract the id parameter from the request.params object.

        const tickets = await Ticket.findById(id);
        return response.status(200).json(tickets);
    } catch (error){
        console.log(error.message); 
        response.status(500).send({ message: error.message});
    }
}); 

// Route to GET ONE ticket by NAME  
//params is parameter which is what you include in your request 
//query is your fields which is what you type in the query params with key is name and value is "place-here-the-name"
// app.get('/tickets', async (request, response) => {
//     try {
//         const { name } = request.query;

//         if (!name) {
//             return response.status(400).send({ message: 'Name query parameter is required' });
//         }

//         const ticket = await Ticket.findOne({ name });
//         if (!ticket) {
//             return response.status(404).send({ message: 'Ticket not found' });
//         }

//         return response.status(200).json(ticket);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });



//route for update a ticket 
app.put('/tickets/:id', async (request, response) => {
    try {
        if(
            !request.body.name ||
            !request.body.departure ||
            !request.body.arrival ||
            !request.body.class
        ){
            return response.status(400).send({
                message: 'send all required fields', //only when want to update all fields
            });
        }
        const { id } = request.params;
        const result = await Ticket.findByIdAndUpdate(id, request.body)
        
        if(!result) {
            return response.status(200).json({message: 'Ticket not found'});
        }
        
        return response.status(200).send({message: 'Ticket updated successfully'});
    } catch (error){
        console.log(error.message); 
        response.status(500).send({message: error.message});
    }
})

//route to delete a ticket 
app.delete('/tickets/:id', async (request, response) => {
    try{
        const { id } = request.params; 

        const result = await Ticket.findByIdAndDelete(id); 

        if(!result){
            return response.status(404).json({message: 'ticket not found'});
        }
        return response.status(200).send({message: 'ticket deleted'});
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//to connect database 
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('app connected to database');
        app.listen(PORT, () => { //exporess server to run only if the dtb connection is successful
            console.log(`app is listening on port: ${PORT}`)
        }); 
    })
    .catch((error)=>{
        console.log(error);
    });