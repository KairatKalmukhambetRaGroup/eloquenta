import React from 'react'

import '@/styles/admin/teachers.scss';

import TeacherIntImg from '@/assets/images/tutor-image-init.png';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const TeacherCard = ({teacher}: any) => {
    const langT = useTranslations('languages');

    return (
        <div className="teacher-card">
            <div className="teacher-body">
                <div className="teacher-image">
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${teacher.users.id}`} alt='preview' />
                </div>
                <div className="teacher-info">
                    <div className="name">
                        {teacher.users.name} {teacher.users.surname}
                    </div>
                    {/* <div className="language">
                        {teacher.languages.map((language, key)=> 
                            language.isTeaching && 
                            <div key={key} className={`badge ${language.lang}`}>{langT(language.lang)}</div>
                        )}
                    </div>   */}
                </div>
            </div>
            <div className="btns">
                <Link href={`/tutor/${teacher.id}`} className='btn edit'>
                    Подробнее
                </Link>
                <div className="btn delete">
                    Удалить
                </div>
            </div>
        </div>
    )
}

export default TeacherCard