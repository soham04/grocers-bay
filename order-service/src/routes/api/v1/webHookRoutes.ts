import express from 'express';
export const webHookRouter = express.Router();
import bodyParser from 'body-parser';
import { stripeWebHook } from '../../../controllers/webHookControllers/stripe'
// import { verifyToken } from '../../../middlewares/authenticate';

webHookRouter.post('/', bodyParser.raw({ type: '*/*' }), express.raw({ type: 'application/json' }), stripeWebHook);
