import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

// Constants
const PORT: number = 3000;
const HOST: string = '0.0.0.0';

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello world');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
