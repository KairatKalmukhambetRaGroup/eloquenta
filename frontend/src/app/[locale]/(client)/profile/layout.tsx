import UserSidebar from '@/components/user/UserSidebar'
import React from 'react'

import '@/styles/profile/profile.scss';

const ProfileLayout = ({children, params: {locale}}: any) => {
    return (
        <div id="profile">
            <UserSidebar locale={locale} />
            {children}
        </div>
    )
}

export default ProfileLayout