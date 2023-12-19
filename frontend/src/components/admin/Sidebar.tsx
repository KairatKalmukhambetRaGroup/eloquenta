import React from 'react'
import '@/styles/admin/sidebar.scss';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div id="adminSidebar">
            <Link href="/" className='logo'>
                <i></i>
            </Link>
            <nav>
                <Link href="/admin/">
                    Главная
                </Link>
                <Link href="/admin/">
                    Отчет
                </Link>
                <Link href="/admin/">
                    Учителя
                </Link>
                <Link href="/admin/">
                    Настройки
                </Link>
            </nav>
        </div>
    )
}

export default Sidebar