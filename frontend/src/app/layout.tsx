import ContextProvider from '@/providers/ContextProvider'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { PlayfairDisplayFont, RalewayFont } from '@/utils/customFonts';


import '@/styles/global.scss';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Eloquenta',
}

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={`${PlayfairDisplayFont.className} ${RalewayFont.className}`}>
                <ContextProvider>
                    <Header />
                    {children}
                </ContextProvider>
            </body>
        </html>
    )
}
