import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import '@/styles/lessoncard.scss';

const LessonsCard = () => {
    return (
        <div className="lesson-card disabled">
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
                        <div className="name">John Doe</div>
                        <div className="language">Russian </div>
                    </div>
                </div>
                <Link href="/" className='more'>
                    Узнать больше
                    <i></i>
                </Link>
            </div>
        </div>
    )
}

export default LessonsCard