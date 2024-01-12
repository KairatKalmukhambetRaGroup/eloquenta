"use client"
import React, { useEffect, useState } from 'react'

import TutorCard from '@/components/tutor/TutorCard'
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import Pagination from '@/components/Pagination';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

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

const Tutors = ({locale}: any) => {
    const t = useTranslations('tutors');
    const searchParams = useSearchParams();
    // const lang = searchParams.get('lang');
    // const days = searchParams.getAll('day');
    // const times = searchParams.getAll('time');
    // const sort = searchParams.get('sort');

    const [teachers, setTeachers] = useState<any[]>([]);

    const getTeacher = async () => {
        try {

            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teachers/search?${searchParams.toString()}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            console.log(data);
            setTeachers(data);
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
            <Pagination currentPage='2' totalPages='16' />
        </div>
    )
}

export default Tutors