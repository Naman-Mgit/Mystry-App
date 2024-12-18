import mongoose,{Document} from "mongoose";

export interface Message extends Document{
     content:string;
     createdAt:Date
}

const MessageSchema:mongoose.Schema<Message>=new mongoose.Schema({
     content:{
        type:String,
        required:true
     },
     createdAt:{
        type:Date,
        required:true,
        default:Date.now
     }
})

export interface User extends Document{
    username:string;
    password:string;
    email:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
}

const UserSchema:mongoose.Schema<User>=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/a-zA-Z0-9._%+-/,"Enter a valid email address"],
        lowercase:true,
    },
    password:{
        type:String,
        unique:true,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:false,
    },
    messages:[MessageSchema]
})
// To check if the model is alredy created or it is being created first time::
const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))

export default UserModel;
