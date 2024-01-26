"use client"
import React, { useEffect } from 'react'
import '@/styles/admin/sidebar.scss';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';

const Sidebar = ({locale}: any) => {
    const pathname = usePathname();
    const router = useRouter();
    const {user} = useUserContext();

    // useEffect(()=>{
    //     if(!user || !user.role || user.role != 'ROLE_ADMIN'){
    //         router.push('/');
    //     }
    // }, [user])

    return (
        <div id="adminSidebar">
            <Link href="/" className='logo'>
                <i></i>
            </Link>
            <nav>
                <Link href="/admin/" className={pathname == `/${locale}/admin` ? 'active' : ''}>
                    Отчет
                </Link>
                {/* <Link href="/admin/reports" className={pathname == '/admin/reports' ? 'active' : ''}>
                </Link> */}
                <Link href="/admin/teachers" className={pathname.includes('/admin/teachers') ? 'active' : ''}>
                    Учителя
                </Link>
                {/* <Link href="/admin/settings" className={pathname.includes('/admin/settings') ? 'active' : ''}>
                    Настройки
                </Link> */}
            </nav>
        </div>
    )
}

export default Sidebar