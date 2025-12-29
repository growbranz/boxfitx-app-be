import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        throw new Error("DATABASE_URL is not defined in environment variables");
    }
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
};
//# sourceMappingURL=db.js.map