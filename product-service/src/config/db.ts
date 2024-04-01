import mongoose from 'mongoose';
import { glogger } from './winston';

const connectDB = async () => {
    try {
        const mongoURI = "mongodb+srv://soham:soham@cluster0.dfruy.mongodb.net/test-database?retryWrites=true&w=majority&appName=Cluster0";

        await mongoose.connect(mongoURI);

        console.log('MongoDB Connected');
        glogger.info('MongoDB Connected')

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        glogger.error('Error connecting to MongoDB:', error.message)

        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
