import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { verifySchema } from "@/schemas/verifySchema";

const VerifycodeQuerySchema=z.object({
    verifyCode:verifySchema
})
export async function POST(request:Request) {
    await dbConnect();
    try {
        const {username,code}=await request.json();
       
        // console.log(searchParams.get('verifyCode'))
        // const queryParam={
        //      verifyCode:code
        // }
        // const result=VerifycodeQuerySchema.safeParse(queryParam)
        // console.log(result);
        // if(!result.success){
        //   const verifycodeErrors=result.error.format().verifyCode?._errors 
        //              || []
        //   return Response.json({
        //        success:false,
        //        message:verifycodeErrors.length>0?verifycodeErrors.join(',')
        //           :'Invalid query Parameters'
        //   },{status:400})
        // }
        const decodedUsername=decodeURIComponent(username)
        const user=await UserModel.findOne({username:decodedUsername});
        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },
                {
                    status:500
                }
            )
        }
        const iscodevalid=user.verifyCode===code;
        const iscodeNotexpired=new Date(user.verifyCodeExpiry)>new Date();

        if(iscodevalid && iscodeNotexpired){
            user.isVerified=true;
            user.save()
            return Response.json({
                 success:true,
                 message:"User is verified successfully"
            },{status:200})
        }else if(!iscodeNotexpired){
            return Response.json({
                success:false,
                message:"Verification code has expired please signup again to get a new code"
           },{status:400})
        }else {
            return Response.json({
                success:false,
                message:"Incorrect verification code"
           },{status:400})
        }
    } catch (error) {
        console.error("Error checking VerifyCode",error);
        return Response.json({
             success:false,
             message:"Error checking VerifyCode",
        },
        {
            status:500
        }
      )
    }
}
