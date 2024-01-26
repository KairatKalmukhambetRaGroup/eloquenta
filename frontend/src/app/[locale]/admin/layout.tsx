import Sidebar from "@/components/admin/Sidebar";

import '@/styles/admin/admin.scss';

const Layout = ({children, params: {locale}}: any) => {

    

    return (
        <div id="admin">
            <Sidebar locale={locale} />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;