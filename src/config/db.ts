import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri: string = process.env.MONGO_URI || '';

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
