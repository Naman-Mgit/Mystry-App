import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:Number
}
const connection:ConnectionObject={}

console.log(process.env.MONGODB_URI);
async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Database is alredy connected")
        return;
    }
    try {
       console.log(process.env.MONGODB_URI);
       const Db=await mongoose.connect(process.env.MONGODB_URI||"");
       
       console.log(Db.connections);
       connection.isConnected=Db.connections[0].readyState;

       console.log("Database connected successfully!");
    } catch (error) {
        console.log("The error in connecting database is",error);
        process.exit(1);
    }
}
export default dbConnect;