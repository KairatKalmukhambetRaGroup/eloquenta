import { PropsWithChildren } from 'react'

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Assistant from '@/components/Assistant';

export default function RootLayout({children, params: {locale}}: {children: PropsWithChildren, params: any}) {
    return (
        <>
            <Header locale={locale} />
            {children}
            <Assistant />
            <Footer />
        </>               
    )
}
