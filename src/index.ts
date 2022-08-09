import dotenv from 'dotenv';
dotenv.config();

import { Application } from 'express';
import createApplication from './app';
import connectDB from './config/db';

connectDB();

const app: Application = createApplication();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
