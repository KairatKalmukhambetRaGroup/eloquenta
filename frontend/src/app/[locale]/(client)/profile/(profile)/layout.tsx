import TeacherProfileSidebar from '@/components/user/TeacherProfileSidebar'
import React from 'react'

import '@/styles/profile/teacherProfile.scss';
import Link from 'next/link';

const TeacherProfileLayout = ({children, params: {locale}}: any) => {
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