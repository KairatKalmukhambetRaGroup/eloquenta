import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import '@/styles/lessoncard.scss';

const LessonsCard = ({lesson, setCancelId}: any) => {
    return (
        <div className={`lesson-card ${lesson.disabled ? 'disabled' : ''}`}>
            <div className="date-wrapper">
                <div className="day">
                    20
                    <span>дек</span>
                </div>
                <div className="vr"></div>
                <div className="time-wrapper">
                    <div className="time"> 
                        11:00 - 12:00
                        <span>/GMT+6</span>
                    </div>
                    <div className="week-day">
                        Сегодня
                    </div>
                </div>
            </div>
            <div className="info">
                <div className="teacher">
                    <div className="avatar">
                        {/* <Image /> */}
                    </div>
                    <div className="teacher-info">
                        <div className="name">{lesson.teacher.name}</div>
                        <div className="language">{lesson.teacher.language}</div>
                    </div>
                </div>
                <div className='btns'>
                    <div className="cancel" onClick={(e)=>{e.preventDefault(); setCancelId(lesson.id)}}>
                        Отменить урок
                    </div>
                    <Link href={`/profile/lessons/${lesson.id}`} className='more'>
                        Узнать больше
                        <i></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LessonsCard