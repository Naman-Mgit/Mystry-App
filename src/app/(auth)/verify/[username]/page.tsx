"use client"
import React from 'react';
import { useState,useEffect,useRef} from 'react';
import z from  "zod";
import {verifyCodeSchema, verifySchema} from '@/schemas/verifySchema';
import axios, { AxiosError } from "axios"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from '@/hooks/use-toast';
import router from 'next/router';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
const page = () => {
     const [isSubmitting, setisSubmitting] = useState(false);
     const router=useRouter();
     const params=useParams<{username:string}>();
     const form=useForm({
           resolver:zodResolver(verifyCodeSchema),
            defaultValues:{
             verifyCode:'',
            }
    })
    const onSubmit=async (data: z.infer<typeof verifyCodeSchema>)=>{
        setisSubmitting(true);   
        try {
             console.log(data);
             const response=await axios.post(`/api/verify-code`,{username:params.username,code:data.verifyCode});
             if(response.data.success){
                toast({
                   title:'Success',
                   description:response.data.message
                })
                router.replace(`/sign-in`);
            }
            else{
                toast({
                    title:'Verification Failed',
                   description:response.data.message,
                   variant:"destructive"
                })
             }
           } catch (error) {
            console.error("Error in Verification of an user",error)
            const axiosError=error as AxiosError<ApiResponse>;
            let Errormessage=axiosError.response?.data.message;
             toast({
                    title:"Verification failed",
                    description:Errormessage,
                    variant:"destructive"
              })
           }
           finally{
             setisSubmitting(false);
           }
     }

  return (
    <div>
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verification Page
          </h1>
        
        </div>
      <div className="text-center mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    name="verifyCode"
                    control={form.control}
                    render={({field})=>(
                       <FormItem>
                           {/* <FormLabel>Email</FormLabel> */}
                          <FormControl>
                            <Input placeholder="OTP" {...field} 
                                    //...field will directly take while values and give to the data                             
                            />
                          </FormControl>
                          <FormMessage /> 
                       </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSubmitting}>
                     {
                       isSubmitting ? 
                       (
                         <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
                         </>
                       )
                       :
                       ('verify')
                     }
                  </Button>     
              </form>
              
            </Form> 
              
      </div>
    </div>
  </div>
            
    </div>
  )
}

export default page
