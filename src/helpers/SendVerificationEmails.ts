import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function SendVerificationEmail(
     username:string,
     email:string,
     verifyCode:string
):Promise<ApiResponse>{
      try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',//you need a domain to send email
            to: email,
            subject: 'Mystry app verification email',
            react: VerificationEmail({username:username,otp:verifyCode}),
        });
        return {success:true,message:"Verification Email Sent Successfully"}
      } catch (Emailerror){
         console.log("Error in sending email",Emailerror);
         return {success:false,message:"Error in sending email"}
      }
}
