"use client"
import React, { useEffect, useState } from 'react'

import TutorCard from '@/components/tutor/TutorCard'
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import Pagination from '@/components/Pagination';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const Tutors = ({locale}: any) => {
    const t = useTranslations('tutors');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    // const lang = searchParams.get('lang');
    // const days = searchParams.getAll('day');
    // const times = searchParams.getAll('time');
    // const sort = searchParams.get('sort');

    const [teachers, setTeachers] = useState<any[]>([]);

    const getTeacher = async () => {
        try {

            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teachers/search?${searchParams.toString()}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setTeachers(data.teachers);

            const current = new URLSearchParams(Array.from(searchParams.entries()));
            current.set("page", data.page);
            current.set("pages", data.totalPages);
            const search = current.toString();
            const query = search ? `?${search}` : "";
            router.replace(`${pathname}${query}`)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        // if(!teachers || teachers.length == 0){
            getTeacher();
        // }
    }, [searchParams]);

    return (
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
                {teachers ? teachers.map((teacher, key)=>(
                    <TutorCard tutor={teacher} locale={locale} key={key}/>
                )) : (
                    <div className="loading">
                        Loading
                    </div>
                )}
            </div>
            <Pagination/>
        </div>
    )
}

export default Tutors