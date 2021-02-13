import mongoose from 'mongoose';
import config from './config/config';
import app from './app';
import logger from './config/logger';

mongoose.connect(config.mongoose.url, config.mongoose.options, () => {
  logger.info('Connected to MongoDB');
});

app.listen(config.port, () => {
  logger.info(`Running on http://${config.host}:${config.port}`);
});
