import ContextProvider from '@/providers/ContextProvider'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'Eloquenta',
}

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    {children}
                </ContextProvider>
            </body>
        </html>
    )
}
