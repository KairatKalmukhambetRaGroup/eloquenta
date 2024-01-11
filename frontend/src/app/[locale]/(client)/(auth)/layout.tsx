import Image from "next/image";
import { PropsWithChildren } from "react"

import StatsImage from '@/assets/images/stats.png';
import '@/styles/auth.scss';
import { NextIntlClientProvider, useMessages } from "next-intl";

const Layout = ({children}: PropsWithChildren) => {
    const messages = useMessages();
    return (
        <div id="auth">
            <div className="container">
                <div className="content">
                    <Image src={StatsImage} alt="stats" />
                    <NextIntlClientProvider messages={messages}>
                        {children}  
                    </NextIntlClientProvider>
                </div>
            </div>
        </div>
    )
}

export default Layout;