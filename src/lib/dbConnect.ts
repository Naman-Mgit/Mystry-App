import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:Number
}
const connection:ConnectionObject={}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Database is alredy connected")
        return;
    }
    try {
       const Db=await mongoose.connect(process.env.MONGODB_URI||"");
       console.log(Db)
       console.log(Db.connections);
       connection.isConnected=Db.connections[0].readyState;

       console.log("Database connected successfully!");
    } catch (error) {
        console.log("The error in connecting database is",error);
        process.exit(1);
    }
}
export default dbConnect;