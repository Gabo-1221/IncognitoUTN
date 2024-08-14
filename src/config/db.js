const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI; // Sin barra al final
    const dbName = process.env.DB_NAME; // Sin barra al inicio
    await mongoose.connect(`${dbUrl}/${dbName}`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
