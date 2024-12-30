import {z} from "zod"

export const verifyCodeSchema=z.object({
     verifyCode:z.string().length(6,{message:"Verification code must be of 6 digit"})
})
export const verifySchema=z
     .string()
     .length(6,{message:"Verification code must be of 6 digit"})

