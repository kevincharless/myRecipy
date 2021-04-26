import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// BodyParser Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Allow Access-Control-Allow-Origin
app.use(cors());

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Server Port
const PORT = process.env.PORT || 5000

// Connect to Mongodb
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch(error => console.log(error.message))

mongoose.set('useFindAndModify', false);