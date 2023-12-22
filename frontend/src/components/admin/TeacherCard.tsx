import React from 'react'

import '@/styles/admin/teachers.scss';

import TeacherIntImg from '@/assets/images/tutor-image-init.png';
import Image from 'next/image';
import Link from 'next/link';

const TeacherCard = () => {
    return (
        <div className="teacher-card">
            <div className="teacher-body">
                <div className="teacher-image">
                    <Image src={TeacherIntImg} alt="teacher image" loading='lazy' />
                </div>
                <div className="teacher-info">
                    <div className="name">
                        John Doe
                    </div>
                    <div className="language">
                        English
                    </div>  
                </div>
            </div>
            <div className="btns">
                <Link href="/admin/teachers/1" className='btn edit'>
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