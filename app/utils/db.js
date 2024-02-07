import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connections[0].readyState) return console.log('readystate');

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongo connectios successfully established!')
    } catch (error) {
        throw new Error('Error connecting to Mongoose')
    }
}

export default connect;