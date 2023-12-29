import React from 'react'
import '@/styles/profile/lessons.scss';
import Link from 'next/link';

import TeacherImage from '@/assets/images/tutor-image-init.png';
import Image from 'next/image';

const LessonPage = () => {
    return (
        <div id='lesson'>
            <div className="info">
                <div className="teacher-info">
                    <div className="avatar">
                        <Image src={TeacherImage} alt='teacher' />
                    </div>
                    <div className="text">
                        <div className="name">Имя Фамилия</div>
                        <div className="language">
                            Russian 
                            <i></i>
                        </div>
                    </div>
                </div>
                <div className="lesson-info">
                    <div className="date">
                        21 сент., 19:30 - 20:00
                        <span>
                            /GMT +6
                        </span>
                    </div>
                    <div className="status">
                        Завершен успешно
                    </div>
                </div>
            </div>
            <Link href={'/'} className='btn'>
                Забронировать еще занятие
            </Link>
        </div>  
    )
}

export default LessonPage