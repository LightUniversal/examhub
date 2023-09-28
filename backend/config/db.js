import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to the database, with " + conn.connection.host + " as the connection host.")

    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;