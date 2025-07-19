// Packages Import
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// Files Import 
import userRotues from './routes/userRotues.js'
import adminRoutes from './routes/adminRoutes.js'
import { errorMiddleware } from './middlewares/ErrorMiddleware.js';


const app = express();

// Third Party Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true,
}))

// Api Routes
app.use('/api/user',userRotues);
app.use('/api/admin',adminRoutes);

// Error handler
app.use(errorMiddleware)

export default app;
