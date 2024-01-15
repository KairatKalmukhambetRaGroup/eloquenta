'use client'
import TeacherProfileSidebar from '@/components/user/TeacherProfileSidebar'
import React from 'react'

import '@/styles/profile/teacherProfile.scss';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const TeacherProfileLayout = ({children, params: {locale}}: any) => {
    const t = useTranslations('tutor.tabs')
    const pathname = usePathname();
    return (
        <div className="teacher-profile">
            {/* <TeacherProfileSidebar /> */}
            <div className="content">
                <div className="tab-items">
                    <Link href={`/${locale}/profile`} className={`tab-item ${pathname == `/${locale}/profile` ? 'active' : ''}`}>{t('about')}</Link>
                    <Link href={`/${locale}/profile/schedule`} className={`tab-item ${pathname == `/${locale}/profile/schedule` ? 'active' : ''}`}>{t('schedule')}</Link>
                    <Link href={`/${locale}/profile/reviews`} className={`tab-item ${pathname == `/${locale}/profile/reviews` ? 'active' : ''}`}>{t('reviews')}</Link>
                </div>
                {children}
            </div>
        </div>
    )
}

export default TeacherProfileLayout