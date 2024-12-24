import dbConnect from "@/lib/dbConnect";
import { SendVerificationEmail } from "@/helpers/SendVerificationEmails";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
export async function POST(request:Request){
     await dbConnect();
     try {
        const {email,username,password}=await request.json();
        const isExistingUser=await UserModel.findOne({
            username,
            isVerified:true
        })
        if(isExistingUser){
              return Response.json({
                  success:false,
                  message:"User alredy exist"
              },{status:500})
        }
        const existingUserByEmail=await UserModel.findOne({email});

        const verifyCode=Math.floor(100000+Math.random()*900000).toString();
        if(existingUserByEmail){
             if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User alredy exist within the  Email"                   
                },{status:400})
             }
             else{
                const hashedpassword=await bcrypt.hash(password,10);
                existingUserByEmail.password=hashedpassword;
                existingUserByEmail.verifyCode=verifyCode;
                existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+360000);
                await existingUserByEmail.save()
             }
        }
        else{
             const hashedpassword=await bcrypt.hash(password,10);
             const expiryDate=new Date();
             expiryDate.setHours(expiryDate.getHours()+1);

             const incomingUser=new UserModel({
                      username,
                      password:hashedpassword,
                      email,
                      verifyCode,
                      verifyCodeExpiry:expiryDate,
                      isVerified:false,
                      isAcceptingMessage:true,
                      messages:[]
             })
             await incomingUser.save()
        }
        //Send verification email
         const EmailResponse=await SendVerificationEmail(username,email,verifyCode);
         if(!EmailResponse.success){
             return Response.json(
                {
                    success:false,
                    message:EmailResponse.message
                }
                ,{status:500})
         }
         return Response.json(
            {
                success:true,
                message:"User registered successfully. Please verify your account."
            }
            ,{status:201})

     } catch (error) {
        console.error("Error registering user",error);
        return Response.json(
            {
                success:false,
                message:"Error in registering User"
            },
            {
                status:500
            }
        )
     }
}