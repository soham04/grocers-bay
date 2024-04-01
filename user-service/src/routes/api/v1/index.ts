import express from 'express';
const router = express.Router();

// import { tokenRouter } from './tokenRoutes';
// import { googleAuthRouter } from './googleAuthRoutes'
// import { notifRouter } from './notificationRoutes'
import { customerRouter } from './customerRoutes'
import { verifyRouter } from './verifyRoutes'

// router.use('/auth', googleAuthRouter)
// router.use('/token', tokenRouter);
// router.use('/notif', notifRouter);

router.use('/customer', customerRouter);
router.use('/verify', verifyRouter);

// router.use('/login', notifRouter);



export default router