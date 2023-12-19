'use client'

import React from 'react'
import '@/styles/profile/usersidebar.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserSidebar = () => {
    const pathname = usePathname();
    return (
        <div id='usersidebar'>
            <div className="group">
                <label>МЕНЮ</label>
                <div className="links">
                    <Link href="/tutors/english" className='link'>
                        <i className='menu'></i>
                        Меню
                    </Link>
                    <Link href="/profile/lessons" className={`link ${pathname == '/profile/lessons' ? 'active' : ''}`}>
                        <i className='lessons'></i>
                        Мои уроки
                    </Link>
                </div>
            </div>
            <div className="group">
                <label>АККАУНТ</label>
                <div className="links">
                    <Link href="/profile" className={`link ${pathname == '/profile' ? 'active' : ''}`}>
                        <i className='profile'></i>
                        Профиль
                    </Link>
                </div>
            </div>
            <div className="group">
                <label>НАСТРОЙКИ</label>
                <div className="links">
                    <Link href="/profile/settings" className={`link ${pathname.includes('/profile/settings') ? 'active' : ''}`}>
                        <i className='settings'></i>
                        Настройки
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserSidebar