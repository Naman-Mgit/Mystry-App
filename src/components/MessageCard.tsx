"use client"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import axios from "axios";  
import { ApiResponse } from "@/types/ApiResponse"
import { Message } from "@/model/User"
type MessageCardprops={
    message:Message;
    onMessageDelete:(messageId:string)=>void
}
const MessageCard = ({message,onMessageDelete}:MessageCardprops) => {
  const {toast}=useToast();
  const handleDeleteConfirm= async ()=>{
          const response=await axios.delete<ApiResponse>(`/api/delete-messages/${message._id}`);
          toast({
             title:response.data.message
          })
          onMessageDelete(message._id as string);
  }  
  return (
    <Card>
       <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive"><X className="w-5 h-5"/></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
            <CardDescription>Card Description</CardDescription>
       </CardHeader>
       <CardContent>
            <p>Card Content</p>
       </CardContent>
       <CardFooter>
            <p>Card Footer</p>
       </CardFooter>
    </Card>

  )
}

export default MessageCard
