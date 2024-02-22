import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    if (!MONGODB_URI) {
      console.error(
        'The database URI is not defined as an environment variable.',
      )
    }

    cached.promise = mongoose
      // strictQuery can be set here but not in opts, I don’t know why.
      .set('strictQuery', false)
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to Mongoose!')
        return mongoose
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
