"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import React from 'react'


const TeacherProfile = ({user, locale}: any) => {
    const pathname = usePathname();
    return (
        <div id="teacherProfile">
            <div className="teacher-info">
                <div className="teacher-infop-content">
                    <div className="content">
                        <div className="teacher-image">
                            <Image src={TutorImageInit} alt="Tutor image" />
                        </div>
                        <div className="text">
                            <div className="heading">
                                <div className="name">
                                    Имя Фамилия
                                    <i></i>
                                </div>
                                <div className="badge">
                                    Турецкий
                                </div>
                            </div>
                            <div className="langs">
                                <i></i>
                                Владеет английским (родным), русским, казахским языками
                            </div>
                            <div className="price">
                                <div className="value">$46</div>
                                {/* /{t.hour} */}
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        {/* {t.book} */}
                    </div>
                </div>
            </div>
            <div className="tab">
                <div className="tab-items">
                    <div className="tab-item"></div>
                    <div className="tab-item"></div>
                    <div className="tab-item"></div>
                    {/* <Link href={`/${locale}/profile/${}`} className={`tab-item ${pathname == `/${locale}/tutor/${id}` ? 'active' : ''}`}>{t.tabs.about}</Link>
                    <Link href={`/${locale}/tutor/${id}/schedule`} className={`tab-item ${pathname.includes('schedule') ? 'active' : ''}`}>{t.tabs.schedule}</Link>
                    <Link href={`/${locale}/tutor/${id}/reviews`} className={`tab-item ${pathname.includes('reviews') ? 'active' : ''}`}>
                        {t.tabs.reviews}                            
                        <span className="reviews">157</span>
                    </Link> */}
                </div>
                <div className="tab-content">
                    {/* {children} */}
                </div>
            </div>
        </div>
    )
}

export default TeacherProfile