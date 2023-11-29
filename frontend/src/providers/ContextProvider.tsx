"use client"
import { PropsWithChildren } from "react";

import UserProvider from '@/contexts/UserContext';

export const ContextProvider = ({children}: PropsWithChildren) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}

export default ContextProvider;