"use client"
import React, { useEffect, useState } from "react"

import '@/styles/tutors/tutor.scss';
import TutorPage from "@/components/tutor/TutorPage";
import { useTranslations } from "next-intl";
import axios from "axios";


const Layout = ({children, params: {id, locale}}: {children: React.ReactNode, params: any}) => {
    const t = useTranslations('tutor');

    const [teacher, setTeacher] = useState(null);

    const getTeacher = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teachers/getTeacherById/${Number(id)}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            console.log(data);
            // setTeacher(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        // if(!teachers || teachers.length == 0){
            getTeacher();
        // }
    }, [teacher]);

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