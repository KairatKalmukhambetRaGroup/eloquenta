import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import TutorImageInit from '@/assets/images/tutor-image-init.png';

interface TeacherLanguage {
    isTeaching: boolean,
    lang: string,
    level: string,
    price: Number
}

interface TutorInfo {
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

const TutorCard = ({tutor, locale} : {tutor: TutorInfo, locale: any}) => {
    const langT = useTranslations('languages');
    const t = useTranslations('tutors.cards.card');
    return (
        <div className='tutor-card'>
            <div className="card-image">
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${tutor.userId}`} alt='preview' />
                {/* <Image src={TutorImageInit} alt='Tutor image' /> */}
            </div>
            <Link href={`/${locale}/tutor/${tutor.id}`} className="card-heading">
                <div className="name">{tutor.name} {tutor.surname}
                {/* <i className={`nation ${tutor.nation}`}></i> */}
                </div>
                <div className="badges">
                    {tutor.languages.map((language, key)=> 
                        language.isTeaching && 
                        <div key={key} className={`badge ${language.lang}`}>{langT(language.lang)}</div>
                    )}
                </div>
                
            </Link>
            <div className="langs">
                <i></i>
                {/* <div className="langs-content"> */}
                    {t('languages.start')}{tutor.languages.map((language, key)=> `${key == 0 ? '' : ','} ${langT(language.lang)}`)} {t('languages.end')}
                {/* </div> */}
            </div>
            <div className="description">
                {tutor.description}
            </div>
            <div className="card-footer">
                <div className="rating">
                    <i></i>
                    <div className="value">
                        {tutor.rating}
                        <span>
                            ({tutor.ratingCount})
                        </span>
                    </div>
                </div>
                <div className="price">
                    <span>{tutor.price}</span>
                    /{t('hour')}
                </div>
            </div>
            <div className="card-btns">
                {/* <div className="video-btn">
                    <i></i>
                </div> */}
                <Link href={`/${locale}/tutor/${tutor.id}`} className="btn">
                    {t('book')}
                </Link>
            </div>
        </div>
    )
}

export default TutorCard