// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI; 
    const dbName = process.env.DB_NAME; 
    await mongoose.connect(`${dbUrl}/${dbName}`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;