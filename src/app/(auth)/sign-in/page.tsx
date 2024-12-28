"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useToast } from "@/hooks/use-toast";
import axios,{AxiosError} from "axios";
import React from 'react'
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import { ApiResponse } from "@/types/ApiResponse";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signinSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const page = () => {

  const [isSubmitting, setisSubmitting] = useState(false);
  
  const { toast } = useToast();
  const router=useRouter();

  //Zod implementation

  const form=useForm({

      resolver:zodResolver(signinSchema),
      defaultValues:{
         identifier:'',
         password:''
      }
  })
  
  const onSubmit=async (data: z.infer<typeof signinSchema>)=>{
        const result=await signIn('credentials',{
            redirect:false,
            identifier:data.identifier,
            password:data.password
        })
        if(result?.error){
           if(result.error=='CredentialsSignin'){
              toast({
                 title:"Login Failed",
                 description:"Invalid username or Email",
                 variant:"destructive"
              })
           }
           else{
              toast({
                title:"Login Failed",
                description:result.error,
                variant:"destructive"
            })
           }
        }
        router.replace('/dashboard');
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Resume your Journey
          </h1>
          <p className="mb-4">Sign in to continue your anonymous adventure</p>
        </div>
      <div className="text-center mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({field})=>(
                       <FormItem>
                           {/* <FormLabel>Email</FormLabel> */}
                          <FormControl>
                            <Input placeholder="Email/Username" {...field} 
                                    //...field will directly take while values and give to the data                             
                            />
                          </FormControl>
                          <FormMessage /> 
                       </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({field})=>(
                       <FormItem>
                          {/* <FormLabel>Password</FormLabel> */}
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} 
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
                       ('sign In')
                     }
                  </Button>     
              </form>
              
            </Form> 
               
      </div>
    </div>
  </div>
  )
}

export default page


