"use client"
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const page = () => {
  const [message,setMessage]=useState<Message []>([]);
  const [isLoading,setIsLoading]=useState(false);
  const [isswitchLoading,setIsswitchLoading]=useState(false);
  const {toast}=useToast();

  const handleDeleteMessage=(messageId:string)=>{
      setMessage(message.filter((message)=>messageId!==message._id));
  }
  const {data:session}=useSession();
  const form =useForm({
     resolver:zodResolver(acceptMessageSchema)
  })
  const {register,watch,setValue}=form;
  const acceptMessages=watch('acceptMessages');
  
  const fetchAcceptmessage=useCallback(async ()=>{
        setIsswitchLoading(true);
        try {
            const response=await axios.get<ApiResponse>('/api/accept-messages');
            setValue('acceptMessages',response.data.isAcceptingmessages);
        } catch (error) {
           const axiosError=error as AxiosError<ApiResponse>
           toast({
              title:"Error",
              description:axiosError.response?.data.message || "Falied to fetch message settings",
              variant:"destructive"
           })
        }finally{    
             setIsswitchLoading(false);
        }      
  },[setValue]);  
  const fetchMessage=useCallback( async (refresh:boolean=false)=>{
        setIsLoading(true);
        setIsswitchLoading(false);
        try {
          const response=await axios.get<ApiResponse>('/api/get-messages');
          setMessage(response.data.messages || [])
          if(refresh){
            toast({
              title:"Refreshed Messages",
              description:"Showing latest message",
              variant:"default"
            })
          }
        } catch (error) {
          const axiosError=error as AxiosError<ApiResponse>
          toast({
             title:"Error",
             description:axiosError.response?.data.message || "Falied to fetch message settings",
             variant:"destructive"
          })
        }finally{
          setIsswitchLoading(false);
          setIsLoading(false);
        }  
  },[setIsLoading,setMessage])

  useEffect(() => {
    if(!session || !session.user) return;
    fetchMessage();
    fetchAcceptmessage();
  }, [session,setValue,fetchAcceptmessage,fetchMessage]);

  //handle switch change
  const handleSwitchChange=async()=>{
     try {
     const response=await axios.post('/api/accept-message',{
         acceptMessages:!acceptMessages
     })
     setValue('acceptMessages',!acceptMessages);
     toast({
         title:response.data.message,
         variant:"default"
     })
     } catch (error) {
      const axiosError=error as AxiosError<ApiResponse>
      toast({
         title:"Error",
         description:axiosError.response?.data.message || "Falied to fetch message settings",
         variant:"destructive"
      })
     }
  }
  if(!session || !session.user){
    return <div>
      Please login
    </div>
  }
  const {username}=session.user;

  const baseUrl=`${window.location.protocol}//${window.location.hostname}`
  const profileUrl=`${baseUrl}/u/${username}`

  const copytoClipboard=()=>{
       navigator.clipboard.writeText(profileUrl);
       toast({
         title:"URL Copied",
         description:"Profile Url has been copied to clipboard"
       })
  }
   
  return (
    <div>
      Dashboard
    </div> 
  )
}

export default page
