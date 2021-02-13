import express from 'express';
import demoRoute from './demo.routes';
const router = express.Router();

const allRoutes = [
  {
    path: '/demo',
    route: demoRoute,
  },
];

allRoutes.forEach((routeObj) => {
  const { route, path } = routeObj;
  router.use(path, route);
});

export default router;
