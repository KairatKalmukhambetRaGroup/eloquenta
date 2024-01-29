import TutorsSidebarFilter from '@/components/tutor/TutorsSidebarFilter'
import React from 'react'

import '@/styles/tutors/tutors.scss'

import TutorHero from '@/components/tutor/TutorHero';
import { useTranslations } from 'next-intl';
import Tutors from '@/components/tutor/Tutors';
import Loading from '@/components/Loading';



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
                            <Tutors locale={locale} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page