// import express from 'express';
// export const googleAuthRouter = express.Router();

// // import redirect from '../../../controllers/authController/redirect'
// import passport from 'passport';
// import jwt from 'jsonwebtoken';

// // Assuming your original User type looks something like this:
// // interface User {
// //   // ... other properties
// // }

// declare global {
//     namespace Express {
//         interface User {
//             id: string;
//         }
//     }
// }


// googleAuthRouter.get('/google', passport.authenticate("google", {
//     scope: ["email", "profile"],
//     accessType: 'offline',

// }))


// googleAuthRouter.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//     console.log("HHHHHHHH");

//     console.log(req.user?.id);

//     const token = jwt.sign({
//         id: req.user?.id,
//         role: 'Customer'
//     }, process.env.JWT_KEY,
//         { expiresIn: process.env.JWT_EXP_TIME, algorithm: 'HS256' }
//     )
//     res.json({ token });

//     // res.send("This is the callback route");
// });