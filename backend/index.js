import express from "express"; 
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";


const app = express();
 //make it listen to a port, separate your code to different files and folders

app.get('/', (request, response)=> {
    console.log(response)
    return response.status(200).send('welcome to MERN ')
});

//Route for save a new ticket
//bcs working with mongoose is an asynchronous process we use async 
//our callback functions
app.post('tickets', async (res, req)=> {
    try{
        if(
            !res.body.name ||
            !res.body.departure ||
            !res.body.arrival ||
            !res.body.class
        ){
            return res.status(400).send({
                messgae: "pls send all required data fields",
            });
        }
        const newTicket = {
            name: res.body.name, 
            departure: res.body.departure, 
            arrival: res.body.arrival, 
            class: res.body.class, 
        };

        const ticket = await Book.create(newBook);
    }catch(error){
        console.log(error.message); 
        res.status(500).send({message: error.message});
    }
});

//to connect database d
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