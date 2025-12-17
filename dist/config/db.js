import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose
        .connect("mongodb+srv://root:pejAKuqSDZTKFXbh@cluster0.a2nc4w2.mongodb.net/boxfitx")
        .then(() => console.log("Mongodb connected"));
};
// module.exports = connectDB;
//# sourceMappingURL=db.js.map