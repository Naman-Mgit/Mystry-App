import {z} from "zod"

export const MessageSchema=z.object({
     content:z
     .string()
     .min(10,"Content must be of atleast 10 charachters")
     .max(300,"message should not be loner than 300 charachters")
})