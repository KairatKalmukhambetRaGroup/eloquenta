"use client"
import React from 'react'
import '@/styles/admin/sidebar.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div id="adminSidebar">
            <Link href="/" className='logo'>
                <i></i>
            </Link>
            <nav>
                <Link href="/admin/" className={pathname == '/admin' ? 'active' : ''}>
                    Главная
                </Link>
                <Link href="/admin/reports" className={pathname == '/admin/reports' ? 'active' : ''}>
                    Отчет
                </Link>
                <Link href="/admin/teachers" className={pathname.includes('/admin/teachers') ? 'active' : ''}>
                    Учителя
                </Link>
                <Link href="/admin/settings" className={pathname.includes('/admin/settings') ? 'active' : ''}>
                    Настройки
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar