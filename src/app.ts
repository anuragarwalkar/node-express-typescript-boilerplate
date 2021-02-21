import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/v1';
import { successHandler, errorHandler as morganErrorHandler } from './config/morgan';
import anyError from './middlewares/anyError';
import { errorConverter, errorHandler } from './middlewares/error';

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
app.use(anyError as any);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
