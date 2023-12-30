import UserSidebar from '@/components/user/UserSidebar'
import React, { PropsWithChildren } from 'react'

import '@/styles/profile/profile.scss';

const ProfileLayout = ({children}: PropsWithChildren) => {
    return (
        <div id="profile">
            <UserSidebar />
            {children}
        </div>
    )
}

export default ProfileLayout