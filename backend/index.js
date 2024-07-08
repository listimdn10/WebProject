import express, { response } from "express"; 
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Ticket } from "./dtb_models/ticketModel.js";
import ticketsRoute from './routes/ticketsRoute.js';
import cors from 'cors';

const app = express();


 
//middleware for parsing request body 
app.use(express.json());


//middleware for handling CORS POLICY 
app.use(cors()); //allow every methods: get put post delete


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