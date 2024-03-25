import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect("", {
        dbName: "Ecommerce 24",
    })
}