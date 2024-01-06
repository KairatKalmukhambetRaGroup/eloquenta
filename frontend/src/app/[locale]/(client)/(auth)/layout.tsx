import Image from "next/image";
import { PropsWithChildren } from "react"

import StatsImage from '@/assets/images/stats.png';
import '@/styles/auth.scss';

const Layout = ({children}: PropsWithChildren) => {
    return (
        <div id="auth">
            <div className="container">
                <div className="content">
                    <Image src={StatsImage} alt="stats" />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;