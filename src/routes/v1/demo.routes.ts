import express from 'express';
import { demo } from '../../controller/demo.controller';

const router = express.Router();

/**
 * @swagger
 * /demo:
 *   get:
 *     description: Returns the hello world message
 *     responses:
 *       200:
 *         description: hello world
 */

// You can append .post, .put, .patch etc method to this route
// more info https://expressjs.com/en/guide/routing.html
router.route('/').get(demo);

export default router;
