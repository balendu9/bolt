"use client";
import { ConvexProvider, ConvextReactClient } from "convex/react";

import React from 'react'

function ConvexClientProvider({children}) {
    const convex = new ConvextReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
        
    return (
        <ConvexProvider client={convex}>{children}</ConvexProvider>
    )
}

export default ConvexClientProvider