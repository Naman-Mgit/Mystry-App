import UserModel from "@/model/User"
import dbConnect from "@/lib/dbConnect"
import {z} from "zod"
import { usernameValidation } from "@/schemas/signupSchema"

const UsernameQuerySchema=z.object({
     username:usernameValidation
})

export async function GET(request:Request){
    
     await dbConnect();
     try {
        const {searchParams}=new URL(request.url)
        const queryParam={
            //look of our url from which we will extract username::
            //localhost:3000/api/check-username-unnqie?username=rohab?phone=android
            username:searchParams.get('username')
         }
          //Validate with zod
         const result=UsernameQuerySchema.safeParse(queryParam);
         console.log(result);
         if(!result.success){
           const usernameErrors=result.error.format().username?._errors 
                      || []
           return Response.json({
                success:false,
                message:usernameErrors.length>0?usernameErrors.join(',')
                   :'Invalid query Parameters'
           },{status:400})
         }
         const {username}=result.data

         const existingVeifiedUser=await UserModel.findOne({username,isVerified:true})
         if(existingVeifiedUser){
            return Response.json({
                 success:false,
                 message:"Username alredy taken"
            },{status:400})
         }
         return Response.json({
            success:true,
            message:"Username is unique"
         },{status:200})

        
     } catch (error) {
        console.error("Error checking username",error);
        return Response.json({
             success:false,
             message:"Error checking username",
        },
        {
            status:500
        }
      )
    }
}
