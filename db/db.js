// Setup mongo db connection
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI,{dbName: "iphc"});

export default connectMongo;