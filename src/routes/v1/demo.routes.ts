import express from 'express';
import { demo } from '../../controller/demo.controller';

const router = express.Router();

// You can append .post, .put, .patch etc method to this route
// more info https://expressjs.com/en/guide/routing.html
router.route('/').get(demo);

export default router;
