import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request:Request){
        await dbConnect();
        const session = await getServerSession(authOptions);
        const user:User=session?.user as User

        if(!session || !user){
             return Response.json({
                success:false,
                message:"User not authenticated"
             },{status:500});
        }
        //When we use aggregation pipeline takeing user id in the form of string may cause some issue that is why we use inbuilt mongoose
        const userId=new mongoose.Types.ObjectId(user._id);
        try {
            //Using aggregate pipelines
            const user= await UserModel.aggregate([
                 {$match:{id:userId}},
                 {$unwind:'$messages'},
                 {$sort:{'messages.createdAt':-1}},
                 {$group:{_id:'$_id',message:{$push:'$message'}}}
            ])
            if(!user || user.length===0){
                return Response.json({
                     
                        success:false,
                        message:"User not found"                       
                },{status:401})
            }
            return Response.json({
                     
                success:true,
                message:user[0].messages                       
            },{status:400})
        }catch(error){
              console.log("Unauthroised error",error);
              return Response.json({
                  success:false,
                  message:"Unknowing error"
              },{status:500})
        }

}