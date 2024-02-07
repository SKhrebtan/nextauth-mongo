import mongoose from 'mongoose';
require('dotenv').config();
mongoose.set('strictQuery', true);
// const connectMongo = async () => mongoose.connect(process.env.DB_URI);
console.log(process.env.DB_URI)
// export default connectMongo;
const DATABASE_URL = process.env.DB_URI;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
    console.log('connected')
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;