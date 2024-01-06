import React from "react"

import '@/styles/tutors/tutor.scss';
import TutorPage from "@/components/tutor/TutorPage";
import { useTranslations } from "next-intl";


const Layout = ({children, params: {id, locale}}: {children: React.ReactNode, params: any}) => {
    const t = useTranslations('tutor');
    const translation = {
        book: t('book'),
        tabs: {
            about: t('tabs.about'),
            schedule: t('tabs.schedule'),
            reviews: t('tabs.reviews')
        },
        hour: t('hour')
    }
    return (
        <TutorPage children={children} t={translation} locale={locale} id={id}/>
    )
}

export default Layout;