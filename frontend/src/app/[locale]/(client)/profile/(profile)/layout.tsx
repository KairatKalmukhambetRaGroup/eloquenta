"use client"
import TeacherProfileSidebar from '@/components/user/TeacherProfileSidebar'
import React from 'react'

import '@/styles/profile/teacherProfile.scss';
import Link from 'next/link';
import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

const TeacherProfileLayout = ({children, params: {locale}}: any) => {
    const router = useRouter();

    const {user} = useUserContext();
    if(!user)
        router.replace('/');
    if(user && user.role != 'ROLE_TEACHER')
        router.replace('/profile/settings');

    return (
        <div className="teacher-profile">
            <TeacherProfileSidebar />
            <div className="content">
                <div className="tab-items">
                    <Link href={`/${locale}/profile`} className={`tab-item active`}>Про учителя</Link>
                    <Link href={`/${locale}/profile/schedule`} className={`tab-item`}>Расписание</Link>
                    <Link href={`/${locale}/profile/reviews`} className={`tab-item`}>Отзывы</Link>
                </div>
                {children}
            </div>
        </div>
    )
}

export default TeacherProfileLayout