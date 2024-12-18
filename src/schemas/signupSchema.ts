import {z} from "zod";

const usernameValidation=z
    .string()
    .min(2,"Username must be atleast 2 charachters")
    .max(20,"Username must not be more than 20")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special charachter")


export const signUpSchema=z.object({
     username:usernameValidation,
     email:z.string().email({message:"Invalid email address"}),
     password:z.string().min(6,{message:"atleast six charachter is required"})
})