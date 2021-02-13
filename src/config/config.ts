import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {
  NODE_ENV = 'development',
  PORT = 3000,
  HOST = '0.0.0.0',
  MONGODB_URL = 'mongodb://127.0.0.1:27017/node-boilerplate',
} = process.env;

export default {
  env: NODE_ENV,
  port: PORT,
  host: HOST,
  mongoose: {
    url: MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
