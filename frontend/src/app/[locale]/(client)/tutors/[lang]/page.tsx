import TutorsSidebarFilter from '@/components/tutor/TutorsSidebarFilter'
import React from 'react'

import '@/styles/tutors/tutors.scss'
import TutorCard from '@/components/tutor/TutorCard'
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import Pagination from '@/components/Pagination';
import TutorHero from '@/components/tutor/TutorHero';
import { useTranslations } from 'next-intl';

const tutorInit = {
    id: '1',
    image: TutorImageInit,
    name: 'Имя Фамилия',
    nation: 'kz',
    lang: 'tr',
    langs: ['en','ru','kz'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi velit, suscipit nec ligula sit amet, molestie scelerisque nisl.',
    rating: {
        value: '4.9',
        count: '11'
    },
    price: '46',
}

const Page = ({params: {locale}}: any) => {
    const t = useTranslations('tutors');
    return (
        <div id="tutors">
            <div className="container">
                <div className="content">
                    <TutorHero />
                    <div className="tutors-wrapper">
                        <div className="title">
                            {t('title.start')} <span>{t('title.mid')}</span> {t('title.end')} 
                        </div>
                        <div className="tutors">
                            <TutorsSidebarFilter />
                            <div className="cards-wrapper">
                                <div className="heading">
                                    <div className="title">
                                        {t('cards.title')}
                                    </div>
                                    <div className="sort">
                                        <div className="current">
                                            {t('cards.sort.by')}
                                            <span className="value">
                                                {t('cards.sort.best')}
                                            </span>
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="cards">
                                    <TutorCard tutor={tutorInit} locale={locale}/>
                                    <TutorCard tutor={tutorInit} locale={locale}/>
                                    <TutorCard tutor={tutorInit} locale={locale}/>
                                    <TutorCard tutor={tutorInit} locale={locale}/>
                                    <TutorCard tutor={tutorInit} locale={locale}/>
                                    <TutorCard tutor={tutorInit} locale={locale}/>
                                </div>
                                <Pagination currentPage='2' totalPages='16' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page