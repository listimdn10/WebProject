import express, { response } from "express"; 
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Ticket } from "./dtb_models/ticketModel.js";
import ticketsRoute from './routes/ticketsRoute.js';

const app = express();
 //make it listen to a port, separate your code to different files and folders


 
//middleware for parsing request body 
app.use(express.json());

app.get('/', (request, response)=> {
    console.log(request)
    return response.status(200).send('welcome to MERN ')
});

//we will use cac phuong thuc trong ticketsRoute
app.use('/tickets', ticketsRoute);


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