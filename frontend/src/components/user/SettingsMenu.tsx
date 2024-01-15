"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import '@/styles/profile/settingsmenu.scss';
import { useTranslations } from 'next-intl';

const SettingsMenu = () => {
    const t = useTranslations('settings.menu')
    const pathname = usePathname();
    return (
        <div id='settingsMenu'>
            <Link href="/profile/settings" className={`link ${pathname == '/profile/settings' ? 'active' : ''}`}>
                <i className='profile'></i>
                {t("profile")}
            </Link>
            <Link href="/profile/settings/password" className={`link ${pathname == '/profile/settings/password' ? 'active' : ''}`}>
                <i className='password'></i>
                {t("password")}
            </Link>
            {/* <Link href="/profile/settings/notifications" className={`link ${pathname == '/profile/settings/notifications' ? 'active' : ''}`}>
                <i className='notifications'></i>
                {t("notifications")}
            </Link>
            <Link href="/profile/settings/delete" className={`link delete ${pathname == '/profile/settings/delete' ? 'active' : ''}`}>
                <i className='delete'></i>
                {t("delete")}
            </Link> */}
        </div>
    )
}

export default SettingsMenu