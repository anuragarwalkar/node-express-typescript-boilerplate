import { version } from '../../package.json';
import config from '../config/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/anuragarwalkar/node-express-typescript-boilerplate/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

export default swaggerDef;
