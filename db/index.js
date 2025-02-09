import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MONGODB Connected Sucessfully: ", connectionInstance.connection.host)
    } catch (error) {
        console.log("Error while Connecting to MONGODB: ", error)
        process.exit(1)
    }
}

export { connectDB }