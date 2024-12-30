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

const page = () => {
  const [username, setusername] = useState('');
  const [usernameMessage, setusernameMessage] = useState('');
  const [isCheckingUsername, setisCheckingUsername] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const debouncedUsername=useDebounce(username,500);
  const { toast } = useToast();
  const router=useRouter();

  //Zod implementation

  const form=useForm({

      resolver:zodResolver(signUpSchema),
      defaultValues:{
         username:'',
         email:'',
         password:''
      }
  })
  useEffect(() => {
    const checkUsernameunique=async ()=>{
      try {
        setisCheckingUsername(true);
        setusernameMessage('')
        if(debouncedUsername){
           const response=await axios.get(`/api/check-username-unique?username=${debouncedUsername}`);
           console.log(response)
           setusernameMessage(response.data.message);
        }
      } catch (error) {
        const axiosError=error as AxiosError<ApiResponse>;
        setusernameMessage(
           axiosError.response?.data.message ?? "Error checking username"
        )
       }
       finally{
           setisCheckingUsername(false);
       }
        
    }
    checkUsernameunique();
  }, [debouncedUsername]);
  const onSubmit=async (data: z.infer<typeof signUpSchema>)=>{
        console.log("The data inside on submit function is ",data);
        setisSubmitting(true);
        try {
          const response=await axios.post<ApiResponse>('/api/sign-up',data);
          if(response.data.success){
              toast({
                 title:'Success',
                 description:response.data.message
              })
              router.replace(`/verify/${username}`)
          }
          else{
              toast({
                  title:'Signup Failed',
                 description:response.data.message,
                 variant:"destructive"
              })
          }
        }catch(error) {
           console.error("Error in signup of user",error)
           const axiosError=error as AxiosError<ApiResponse>;
           let Errormessage=axiosError.response?.data.message;
           toast({
             title:"Signup failed",
             description:Errormessage,
             variant:"destructive"
           })
        }
        finally{
          setisSubmitting(false);
        }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
      <div className="text-center mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({field})=>(
                       <FormItem>
                           {/* <FormLabel>Username</FormLabel> */}
                          <FormControl>
                            <Input placeholder="Username" {...field} 
                             onChange={(e)=>{
                                field.onChange(e)
                                //Will take value word by word
                                setusername(e.target.value);
                             }}
                            />
                          </FormControl>
                        {isCheckingUsername && <Loader2 className="animate-spin"/>}
                        <p className={`text-sm ${usernameMessage==="Username is unique"?'text-green-500':'text-red-500'}`}>{usernameMessage}</p>
                        <FormMessage /> 
                       </FormItem>
                    )}
                          
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({field})=>(
                       <FormItem>
                           {/* <FormLabel>Email</FormLabel> */}
                          <FormControl>
                            <Input placeholder="Email" {...field} 
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
                       ('signup')
                     }
                  </Button>     
              </form>
              
            </Form> 
            <div className="text-center mt-4">
                <p>
                  Alredy a member?{' '}
                  <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                    Sign in
                  </Link>
                </p>
           </div>   
      </div>
    </div>
  </div>
  )
}

export default page

