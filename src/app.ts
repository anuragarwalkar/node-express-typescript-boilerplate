import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/v1';

const app: Application = express();

// Constants
const PORT: number = 3000;
const HOST: string = '0.0.0.0';

// Enabled cors more info https://www.npmjs.com/package/cors
app.use(cors());

// Setting security http headers more info https://www.npmjs.com/package/helmet
app.use(helmet());

// v1 api routes
app.use('/v1', routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
