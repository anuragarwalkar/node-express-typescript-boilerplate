/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { errorHandler as morganErrorHandler, successHandler } from './config/morgan';
import anyErrorHandler from './middlewares/anyError';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './routes/v1';

const app: Application = express();

// Morgan
app.use(successHandler);
app.use(morganErrorHandler);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enabled cors more info https://www.npmjs.com/package/cors
app.use(cors());

// Setting security http headers more info https://www.npmjs.com/package/helmet
app.use(helmet());

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use(anyErrorHandler as any);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
