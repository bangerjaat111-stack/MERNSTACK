import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from '../src/routes/routes.js';


const app =express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7070
mongoose.connect(process.env.MongoDBUrl)
.then(()=>console.log('mongodb is connected'))
.catch(()=>console.log('mongodb is not connected'))
app.use('/',routes);

app.listen(PORT,()=>console.log(`server is running on port  http://localhost:${PORT}`));