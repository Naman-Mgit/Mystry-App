import { Message } from "@/model/User";

export interface ApiResponse{
     success:boolean,
     message:string,
     isAcceptingmessages?:boolean,
     messages?:Array<Message>
}