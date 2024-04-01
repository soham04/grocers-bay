import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // Assuming you're using UUID for generating unique IDs
import { Customer } from '../../../models/customer';
import multer from 'multer';
import { sendEmail } from '../../../utils/sendGridEmail';

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// Set up multer for parsing form data
const upload = multer();

export const registerController = async (req: Request, res: Response) => {
    // Extracting data from request body
    const { firstName, lastName, password, phoneNumber, email, addressLine1, addressLine2, city, pincode } = req.body;
    // console.log(firstName);


    // Basic validation
    if (!firstName || !lastName || !password || !phoneNumber || !email || !addressLine1 || !city || !pincode) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user with provided email already exists
        const existingUser = await Customer.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generating unique ID for the new user
        const userId = uuidv4();

        const otp = generateRandomString()

        // Creating a new user instance
        await Customer.create({
            id: userId,
            email,
            firstName,
            lastName,
            password: hashedPassword,
            phoneNumber,
            addressLine1,
            addressLine2,
            city,
            pincode,
            lastSignInTime: new Date(),
            OTP: otp,
        });

        await sendEmail(otp, email, userId);

        // Responding with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handling errors
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

function generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export const registerWithFormData = [upload.none(), registerController];
