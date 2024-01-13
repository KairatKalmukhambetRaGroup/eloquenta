'use client'

import React, { useEffect } from 'react'
import '@/styles/profile/usersidebar.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';

const UserSidebar = ({locale}: any) => {
    const {user, logout} = useUserContext();
    const pathname = usePathname();
    return (
        <div id='usersidebar'>
            <div className="group">
                <label>МЕНЮ</label>
                <div className="links">
                    {user && user.role == 'student' && (
                        <Link href="/tutors?lang=en" className='link'>
                            <i className='menu'></i>
                            Меню
                        </Link>
                    )}
                    <Link href="/profile/lessons" className={`link ${pathname.includes('/profile/lessons') ? 'active' : ''}`}>
                        <i className='lessons'></i>
                        Мои уроки
                    </Link>
                    {user && user.role == 'ROLE_ADMIN' && (
                        <Link href="/admin" className='link'>
                            <i className='menu'></i>
                            Админ панель
                        </Link>
                    )}
                </div>
            </div>
            {user && user.role == 'ROLE_TEACHER' && 
                <div className="group">
                    <label>АККАУНТ</label>
                    <div className="links">
                        <Link href="/profile" className={`link ${pathname == `/${locale}/profile` ? 'active' : ''}`}>
                            <i className='profile'></i>
                            Профиль
                        </Link>
                    </div>
                </div>
            }
            <div className="group">
                <label>НАСТРОЙКИ</label>
                <div className="links">
                    <Link href="/profile/settings" className={`link ${pathname.includes('/profile/settings') ? 'active' : ''}`}>
                        <i className='settings'></i>
                        Настройки
                    </Link>
                    <div className={`link`} onClick={logout}>
                        <i className='logout'></i>
                        Выйти
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSidebar