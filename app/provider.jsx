"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'

function Provider({children}) {
    const [messages, setMessages]=useState();
    const [userDetail, setUserDetail]= useState();
    const convex= useConvex();

    useEffect(()=> {
        IsAutheicated();
    }, [])

    const IsAutheicated=()=>{
        if(typeof window!==undefined) {
            const user= JSON.parse(localStorage.getItem('user'))
            //fetch from database
            const result = await convex.query(api.users.GetUser, {
                email:user?.email
            })
            setUserDetail(result);
            console.log(result);
        }
    }

    return (
        <div>
            <UserDetailContext.Provider value={{}}>
            <MessagesContext.Provider value={{messages, setMessages}}>

            
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <Header/>
                {children}
            </NextThemesProvider>
            </MessagesContext.Provider>
            </UserDetailContext.Provider>
        </div>
    )
}
export default Provider 