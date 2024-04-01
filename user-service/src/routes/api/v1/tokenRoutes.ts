import express, { NextFunction } from 'express';
export const tokenRouter = express.Router();

import {verifyToken} from '../../../../src/controllers/tokenController/verifyController';

tokenRouter.post('/verify', verifyToken)