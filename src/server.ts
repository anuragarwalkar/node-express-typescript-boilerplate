import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import logger from './config/logger';

(async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(error);
  }
})();

app.listen(config.port, () => {
  logger.info(`Running on http://${config.host}:${config.port}`);
});
