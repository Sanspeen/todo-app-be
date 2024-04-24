import express from 'express';
import { PORT, CONECTDB } from '../data/constantes.js';
import taskRoutes from './routes/tasks.routes.js';
import mongoose from 'mongoose';



const app = express();

app.use(express.json());

app.use(taskRoutes);


mongoose.connect(CONECTDB)
    .then(() =>{
        console.log('Connected to MongoDB')
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        });
    }).catch((error)=>{
        console.log(error)
    })