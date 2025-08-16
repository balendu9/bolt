"use client"

import { MessagesContext } from '@/context/MessagesContext'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, {useContext, useState} from 'react'

const Hero = () => {
    const [userInput, setUserInput]=useState();
    const {messages,setMessages}=useContext(MessagesContext);

    const onGenerate=()=> {
        setMessages({
            role:'user',
            content:input
        })
    }

  return (
    <div className='flex flex-col items-center mt-36 xl:mt-42 gap-2'>
        <h2 className="font-bold text-4xl">
            {Lookup.HERO_HEADING}
        </h2>
        <p className="text-gray-400 font-medium">
            {Lookup.HERO_DESC}
        </p>
        <div className="p-5 border rounded-xl max-w-2xl w-full mt-3">
            <div className="flex gap-2">
                <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
                onChange={(event) => setUserInput(event.target.value)}
                className='outline-none bg-transparent w-full h-32'/>
                {userInput && <ArrowRight 
                onClick={()=>onGenerate(userInput)}
                className='bg-blue-500 p-2 h-8 w-8 rounded-md' /> }
            </div>
            <div>
                <Link className='w-5 h-5' />
            </div>
        </div>

        <div className='flex flex-wrap max-w-2xl'>
            {Lookup?.SUGGSTIONS.map((suggestion, index)=> (
                <h2 key={index}
                onClick={()=>onGenerate(suggestion)}
                className='p-1 px-2 border'
                >{suggestion}</h2>
            ))}
            
        </div>
    </div>
  )
}

export default Hero