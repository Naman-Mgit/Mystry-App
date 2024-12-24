import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";

export async function POST(request:Request){
         await dbConnect();

         const session=await getServerSession(authOptions);
         const user:User=session?.user as User

         if(!session || !user){
            return Response.json({
                success:false,
                message:"Not Authenticated"
            },{status:401})
         }
         const userId=user._id;
         const {acceptingMessages}=await request.json()
         try {
             const updatedUser=await UserModel.findByIdAndUpdate({userId},{isAcceptingMessage:acceptingMessages},{new:true});
             if(!updatedUser){
                return Response.json({
                    success:false,
                    message:"failed to update user status to accept messages"
                },{status:401})
             }
             return Response.json({
                success:true,
                message:"Updated user status successfully"
            },{status:200})
         } catch (error) {
              console.log("failed to update user status to accept messages")
              return Response.json({
                success:false,
                message:"failed to update user status to accept messages"
            },{status:401})
         }
                
}
export async function GET(request:Request){
    await dbConnect();

         const session=await getServerSession(authOptions);
         const user:User=session?.user as User

         if(!session || !user){
            return Response.json({
                success:false,
                message:"Not Authenticated"
            },{status:401})
         }
         const userId=user._id;
         try {
            const founduser=await UserModel.findById({userId});
            if(!founduser){
                return Response.json({
                    
                        success:false,
                        message:"User not found"
                },{status:401})
            }
            return Response.json({
                    
                success:true,
                isAcceptingMessages:founduser.isAcceptingMessage
            },{status:200})

         } catch (error) {
            console.log("failed to update user status to accept messages")
              return Response.json({
                success:false,
                message:"failed to update user status to accept messages"
            },{status:401})
         }
}