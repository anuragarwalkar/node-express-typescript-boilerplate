import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/v1';
import { successHandler, errorHandler } from './config/morgan';

const app: Application = express();

// Morgan
app.use(successHandler);
app.use(errorHandler);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enabled cors more info https://www.npmjs.com/package/cors
app.use(cors());

// Setting security http headers more info https://www.npmjs.com/package/helmet
app.use(helmet());

// v1 api routes
app.use('/v1', routes);

export default app;
