import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes/routes.js';

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 8080

mongoose.connect(process.env.MongoDBUrl)
    .then(() => {
        console.log('MongoDB is connected...');
        
    })
    .catch((err) => console.log('MongoDB connection error:', err.message));

app.use('/', routes);  

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
  