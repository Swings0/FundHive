import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URL || "", {
      connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
      socketTimeoutMS: 30000, // Increase socket timeout to 30 seconds
    });
    return dbConnection;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection error:", error.message);
    } else {
      console.log("An unknown error occurred during connection");
    }
  }
}


// export default async function dbConnect(){
//      try {
//         const mongoUrl = process.env.MONGO_URL
//         if (!mongoUrl) {
//             throw new Error("MONGO_URL is not defined in the environment variables");
//           }

//          // Connect to MongoDB
//         const dbConnection = await mongoose.connect(mongoUrl)
//         console.log("Database connected successfully!");   

//         return dbConnection

//      } catch (error) {
//         if(error instanceof Error){
//             console.error("Database connection error:",error.message);    
//         } else {
//             console.log("An unknown error occurred during connection");            
//         }
//      }
// }