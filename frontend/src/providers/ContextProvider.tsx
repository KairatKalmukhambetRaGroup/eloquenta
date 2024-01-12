// "use client"
import { PropsWithChildren } from "react";

import UserProvider from '@/contexts/UserContext';
import { NextIntlClientProvider, useMessages } from "next-intl";

export const ContextProvider = ({children}: PropsWithChildren) => {
    const messages = useMessages();
    return (
        <UserProvider>
            <NextIntlClientProvider messages={messages}>
                {children}
            </NextIntlClientProvider>
        </UserProvider>
    )
}

export default ContextProvider;