import ContextProvider from '@/providers/ContextProvider'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { PlayfairDisplayFont, RalewayFont } from '@/utils/customFonts';


import '@/styles/global.scss';
import { IntlProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'Eloquenta',
}

export default function RootLayout({children, params: {locale}}: {children: any, params: any}) {
    return (
        <html lang={locale}>
            <body className={`${PlayfairDisplayFont.className} ${RalewayFont.className}`}>
                <ContextProvider>
                    {children}
                </ContextProvider>
            </body>
        </html>
    )
}
