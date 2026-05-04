import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/belgrano-cyd';
  await mongoose.connect(uri);
  console.log(`✅ MongoDB conectado: ${mongoose.connection.host}`);
};

export default connectDB;
