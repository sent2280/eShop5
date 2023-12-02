import mongoose from 'mongoose';

// const mongo_direct_uri = 'mongodb+srv://ssenthils115:Senthil1100m@cluster0.7rlewlc.mongodb.net/eshop?retryWrites=true&w=majority';
const connectDB = async() =>{
    try {
         console.log("URI = " + process.env.MONGO_URI);
        console.log("Connecting to DB ...");
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connected ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;