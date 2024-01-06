import { PropsWithChildren } from 'react'

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({children, params: {locale}}: {children: PropsWithChildren, params: any}) {
    return (
        <>
            <Header locale={locale} />
            {children}
            <Footer />
        </>               
    )
}
