import Image from "next/image";
import React, { PropsWithChildren } from "react"

import '@/styles/tutors/tutor.scss';
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import Link from "next/link";


const Layout = ({children, params}: {children: React.ReactNode, params: {id: string}}) => {
    return (
        <div className="tutor">
            <div className="container">
                <div className="content">
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
                                        <div className="lang">
                                            Турецкий
                                        </div>
                                    </div>
                                    <div className="langs">
                                        <i></i>
                                        Владеет английским (родным), русским, казахским языками
                                    </div>
                                    <div className="price">
                                        <div className="value">$46</div>
                                        /час
                                    </div>
                                </div>
                            </div>
                            <div className="btn">
                            Забронировать занятие
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <div className="tab-items">
                            <Link href={`/tutor/${params.id}`} className="tab-item active">Про учителя</Link>
                            <Link href={`/tutor/${params.id}/schedule`} className="tab-item">Расписание</Link>
                            <Link href={`/tutor/${params.id}/reviews`} className="tab-item">
                                Отзывы
                                <span className="reviews">157</span>
                            </Link>
                        </div>
                        <div className="tab-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;