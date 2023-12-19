import React, { PropsWithChildren } from 'react'
import '@/styles/profile/settings.scss';
import SettingsMenu from '@/components/user/SettingsMenu';

const ProfileSettingsLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="content" id='profileSettings'>
            <h1>
                Настройки
            </h1>
            <div className="settings-wrapper">
                <SettingsMenu />
                {children}
            </div>
        </div>
    )
}

export default ProfileSettingsLayout