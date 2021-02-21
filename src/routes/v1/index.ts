import express from 'express';
import demoRoute from './demo.routes';
import swaggerRoute from './swagger.routes';
const router = express.Router();

const allRoutes = [
  {
    path: '/demo',
    route: demoRoute,
  },
  {
    path: '',
    route: swaggerRoute,
  },
];

allRoutes.forEach((routeObj) => {
  const { route, path } = routeObj;
  router.use(path, route);
});

export default router;
