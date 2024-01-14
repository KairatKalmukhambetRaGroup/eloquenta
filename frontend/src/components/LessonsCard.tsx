import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import '@/styles/lessoncard.scss';

const LessonsCard = ({lesson, setCancelId}: any) => {
    console.log(lesson);
    return (
        <div className={`lesson-card ${lesson.disabled ? 'disabled' : ''}`}>
            <div className="info">
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
                <div className="teacher">
                    <div className="avatar">
                        {lesson.teacher ? 
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${lesson.teacher.id}`} alt='preview' />
                            :
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${lesson.student.id}`} alt='preview' />
                        }
                    </div>
                    <div className="teacher-info">
                        {lesson.teacher ? 
                            <div className="name">{lesson.teacher.name} {lesson.teacher.surname}</div>
                            :
                            <div className="name">{lesson.student.name} {lesson.student.surname}</div>
                        }
                        <div className="language">{lesson.lang}</div>
                    </div>
                </div>
            </div>
            <div className='btns'>
                <Link href={lesson.meetingLink} className='btn'>
                    Присоединиться
                </Link>
                <div className="cancel" onClick={(e)=>{e.preventDefault(); setCancelId(lesson.id)}}>
                    Отменить урок
                </div>
            </div>
        </div>
    )
}

export default LessonsCard