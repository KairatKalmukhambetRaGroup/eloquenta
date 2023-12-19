"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import '@/styles/profile/settingsmenu.scss';

const SettingsMenu = () => {
    const pathname = usePathname();
    return (
        <div id='settingsMenu'>
            <Link href="/profile/settings" className={`link ${pathname == '/profile/settings' ? 'active' : ''}`}>
                <i className='profile'></i>
                Профиль
            </Link>
            <Link href="/profile/settings/password" className={`link ${pathname == '/profile/settings/password' ? 'active' : ''}`}>
                <i className='password'></i>
                Пароль
            </Link>
            <Link href="/profile/settings/notifications" className={`link ${pathname == '/profile/settings/notifications' ? 'active' : ''}`}>
                <i className='notifications'></i>
                Уведомление
            </Link>
            <Link href="/profile/settings/delete" className={`link delete ${pathname == '/profile/settings/delete' ? 'active' : ''}`}>
                <i className='delete'></i>
                Удалить аккаунт
            </Link>
        </div>
    )
}

export default SettingsMenu