import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import '@/styles/lessoncard.scss';
import { useTranslations } from 'next-intl';

const months = ['jan', 'feb','mar','apr','may','jun','jul','aug','sep','oct','nov', 'dec'];

const LessonsCard = ({lesson, setCancelId, activeTab}: any) => {
	const t = useTranslations("profile.lessons.card");
    const monthT = useTranslations('months');
    const date = new Date(0);
    date.setUTCSeconds(lesson.time)
    const h = date.getHours();
    const gmt = (date.getTimezoneOffset() / -60.0);
    return (
        <div className={`lesson-card ${lesson.disabled ? 'disabled' : ''}`}>
            <div className="info">
                <div className="date-wrapper">
                    <div className="day">
                        {date.getDate()}
                        <span>{monthT(`${months[date.getMonth()]}.short`)}</span>
                    </div>
                    <div className="vr"></div>
                    <div className="time-wrapper">
                        <div className="time"> 
                            {h}:00 - {Number(h)+1}:00
                            <span>/GMT {gmt>=0 && '+'}{gmt}</span>
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
                {activeTab != 'past' && 
                    <Link href={lesson.meetingLink} className='btn'>
                        {t('join')}
                    </Link>
                }
                {activeTab == 'planed' && 
                    <div className="cancel" onClick={(e)=>{e.preventDefault(); setCancelId(lesson.id)}}>
                        {t('cancel')}
                    </div>
                }
            </div>
        </div>
    )
}

export default LessonsCard