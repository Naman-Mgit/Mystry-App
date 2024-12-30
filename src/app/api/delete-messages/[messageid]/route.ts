import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request:Request,{params}:{params:{messageid:string}}){
     const messageId=params.messageid;
     await dbConnect();
     const session=await getServerSession(authOptions);
     const user:User=session?.user as User;

     if(!session || !session.user){
        return Response.json({
            seccess:false,
            message:"Not Authenticated"
        },{status:401})
     }
     try {
        const updateResult=await UserModel.updateOne(
            {_id:user._id},
            {$pull:{messages:{_id:messageId}}}
        )
        if(updateResult.modifiedCount===0){
            return Response.json({
                seccess:false,
                message:"Message not found or already deleted"
            },{status:404})
        }
        return Response.json({
            seccess:true,
            message:"Message deleted successfully"
        },{status:200})
     } catch (error) {
        console.log("Error in deleteing a message",error);
        return Response.json({
            seccess:false,
            message:"Error in deleteing a message"
        },{status:500})
        
     }
}