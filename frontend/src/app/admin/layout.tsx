import { PropsWithChildren } from "react"

import Sidebar from "@/components/admin/Sidebar";

import '@/styles/admin/admin.scss';

const Layout = ({children}: PropsWithChildren) => {
    return (
        <div id="admin">
            <Sidebar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;