"use client"
import React, { PropsWithChildren } from 'react'
import '@/styles/profile/settings.scss';
import SettingsMenu from '@/components/user/SettingsMenu';
import { useTranslations } from 'next-intl';

const ProfileSettingsLayout = ({children}: PropsWithChildren) => {
    const t = useTranslations("settings");

    return (
        <div className="content" id='profileSettings'>
            <h1>
                {t("title")}
            </h1>
            <div className="settings-wrapper">
                <SettingsMenu />
                {children}
            </div>
        </div>
    )
}

export default ProfileSettingsLayout