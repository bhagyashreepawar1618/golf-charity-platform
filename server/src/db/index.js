import mongoose from 'mongoose';
import DATABASE_NAME from '../constants.js';

const connectDB = async () => {
  try {
    console.log('mgdb url=', process.env.MONGODB_URL);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DATABASE_NAME}`
    );

    console.log(`MongoDB connected !!! DB Host : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection failed ', error);
    process.exit(1);
  }
};

export default connectDB;
