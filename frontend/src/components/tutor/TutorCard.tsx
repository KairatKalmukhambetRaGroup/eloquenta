import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface TutorInfo {
    id: string,
    image: any,
    name: string,
    nation: string,
    lang: string,
    langs: string[],
    description: string,
    rating: {
        value: string,
        count: string
    },
    price: string
}

const TutorCard = ({tutor, locale} : {tutor: TutorInfo, locale: any}) => {
    const langT = useTranslations('languages');
    const t = useTranslations('tutors.cards.card');
    return (
        <div className='tutor-card'>
            <div className="card-image">
                <Image src={tutor.image} alt='Tutor image' />
            </div>
            <Link href={`/${locale}/tutor/${tutor.id}`} className="card-heading">
                <div className="name">{tutor.name} <i className={`nation ${tutor.nation}`}></i></div>
                <div className={`badge ${tutor.lang}`}>{langT(tutor.lang)}</div>
            </Link>
            <div className="langs">
                <i></i>
                {/* <div className="langs-content"> */}
                    {t('languages.start')}{tutor.langs.map((lang, key)=> `${key == 0 ? '' : ','} ${langT(lang)}`)} {t('languages.end')}
                {/* </div> */}
            </div>
            <div className="description">
                {tutor.description}
            </div>
            <div className="card-footer">
                <div className="rating">
                    <i></i>
                    <div className="value">
                        {tutor.rating.value}
                        <span>
                            ({tutor.rating.count})
                        </span>
                    </div>
                </div>
                <div className="price">
                    <span>{tutor.price}</span>
                    /{t('hour')}
                </div>
            </div>
            <div className="card-btns">
                <div className="video-btn">
                    <i></i>
                </div>
                <Link href={`/${locale}/tutor/${tutor.id}`} className="btn">
                    {t('book')}
                </Link>
            </div>
        </div>
    )
}

export default TutorCard