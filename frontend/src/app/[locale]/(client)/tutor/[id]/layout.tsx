"use client"
import React, { useEffect, useState } from "react"

import '@/styles/tutors/tutor.scss';
import { useTranslations } from "next-intl";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface TeacherLanguage {
    id: number,
    isTeaching: boolean,
    lang: string,
    level: string,
    price: Number
}

interface TeacherInfo {
    id: string,
    userId: string,
    name: string,
    surname: string,
    languages: TeacherLanguage[],
    description: string,
    rating: string,
    ratingCount: string,
    price: string
}

const Layout = ({children, params: {id, locale}}: {children: React.ReactNode, params: any}) => {
    const t = useTranslations('tutor');
    const langT = useTranslations('languages');

    const pathname = usePathname();

    const [teacher, setTeacher] = useState<TeacherInfo>();
    const getTeacher = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teachers/getTeacherById/${Number(id)}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setTeacher(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!teacher){
            getTeacher();
        }
    }, [teacher]);

    if(!teacher)
        return;
    return (
        <div className="tutor">
            <div className="container">
                <div className="content">
                    <div className="teacher-info">
                        <div className="teacher-infop-content">
                            <div className="content">
                                <div className="teacher-image">
                                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${teacher.userId}`} alt='preview' />
                                </div>
                                <div className="text">
                                    <div className="heading">
                                        <div className="name">
                                            {teacher.name} {teacher.surname}
                                            {/* <i></i> */}
                                        </div>
                                        <div className="badges">
                                            {teacher.languages.map((language, key)=> 
                                                language.isTeaching && 
                                                <div key={key} className="badge">{langT(language.lang)}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="langs">
                                        <i></i>
                                        {/* {t('languages.start')} */}
                                        {teacher.languages.map((language, key)=> `${key == 0 ? '' : ','} ${langT(language.lang)}`)} 
                                        {/* {t('languages.end')} */}

                                        {/* Владеет английским (родным), русским, казахским языками */}
                                    </div>
                                    <div className="price">
                                        <div className="value">{teacher.price}</div>
                                        /{t('hour')}
                                    </div>
                                </div>
                            </div>
                            <div className="btn">
                                {t('book')}
                            </div>
                        </div>
                    </div>
                    <div className="tab">
                        <div className="tab-items">
                            <Link href={`/${locale}/tutor/${id}`} className={`tab-item ${pathname == `/${locale}/tutor/${id}` ? 'active' : ''}`}>{t('tabs.about')}</Link>
                            <Link href={`/${locale}/tutor/${id}/schedule`} className={`tab-item ${pathname.includes('schedule') ? 'active' : ''}`}>{t('tabs.schedule')}</Link>
                            <Link href={`/${locale}/tutor/${id}/reviews`} className={`tab-item ${pathname.includes('reviews') ? 'active' : ''}`}>
                                {t('tabs.reviews')}                            
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