import express from 'express';
import cors from 'cors';
import agencyRoutes from './routes/admin/agencyRoutes';
import userRoutes from './routes/admin/userRoutes'
import authRoutes from './routes/public/authRoutes';
import { Middleware } from './middleware';
import { setupSwagger } from '../swagger';

const app = express();

app.use(express.json());

app.use(cors())

setupSwagger(app)

// Admin routes

app.use('/agency', Middleware, agencyRoutes)

app.use('/user', Middleware, userRoutes)

// Public routes

app.use('/auth', authRoutes)

app.listen(3001, () => console.log('API no ar!'))