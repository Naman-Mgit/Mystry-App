'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function Home() {
  return (
      <>
         <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12  bg-gray-800 text-white">
         <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
        <div className='mt-3'>
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full max-w-xs"
            >
            <CarouselContent className="-mt-1 h-[200px]">
            {
              messages.map((message,index)=>(
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                  <div className="p-1">
                    <Card className='p-1'>
                      <CardHeader className='text-center font-extrabold'>
                         {message.title}
                      </CardHeader>
                      <CardContent className="flex items-center justify-center p-1 mb-4 text-center">
                        <span className="text-ls font-semibold">{message.content}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            }
            </CarouselContent>
            <CarouselPrevious className='bg-slate-600'/>
            <CarouselNext  className='bg-slate-600'/>
          </Carousel>
        </div>
        </main>
       <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 True Feedback. All rights reserved.
      </footer>
      </>
  );
}