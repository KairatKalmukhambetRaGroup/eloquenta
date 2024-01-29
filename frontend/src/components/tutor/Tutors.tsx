"use client"
import React, { useEffect, useState } from 'react'

import TutorCard from '@/components/tutor/TutorCard'
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import Pagination from '@/components/Pagination';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from '../Loading';

const Tutors = ({locale}: any) => {
    const t = useTranslations('tutors');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    // const lang = searchParams.get('lang');
    // const days = searchParams.getAll('day');
    // const times = searchParams.getAll('time');
    // const sort = searchParams.get('sort');

    let calcelTokenSource = axios.CancelToken.source();

    const [teachers, setTeachers] = useState<any[]>([]);

    const [prevSearchString, setPrevSearchString] = useState('');
    const [loading, setLoading] = useState(false);

    const getTeacher = async () => {
        try {
            setLoading(true);
            setTeachers([]);
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teachers/search?${searchParams.toString()}`, {cancelToken: calcelTokenSource.token, validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            console.log(data)
            setTeachers(data.teachers);
            setLoading(false);
            const current = new URLSearchParams(Array.from(searchParams.entries()));

            
            if(data.totalPages > 1){
                current.set("page", data.page);
                current.set("pages", data.totalPages);
                const search = current.toString();
                const query = search ? `?${search}` : "";
                router.replace(`${pathname}${query}`, {scroll: false})
            }
            else if(data.page == 1 && data.totalPages == 1){
                current.delete('page')
                current.delete('pages')
                const search = current.toString();
                const query = search ? `?${search}` : "";
                router.replace(`${pathname}${query}`, {scroll: false})
            }
            
        } catch (error) {
            setLoading(false);
            if(axios.isCancel(error)){
                console.log(error.message)
            }else{
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        // if(prevSearchString != searchParams.toString()){
            // setPrevSearchString(searchParams.toString());
            getTeacher();
        // }

        // return () => {
        //     setLoading(false);
        //     calcelTokenSource.cancel('Component unmounted or value changed');  
        // };
    }, [searchParams]);

    return (
        <div className="cards-wrapper">
            <div className="heading">
                <div className="title">
                    {t('cards.title')}
                </div>
                {/* <div className="sort">
                    <div className="current">
                        {t('cards.sort.by')}
                        <span className="value">
                            {t('cards.sort.best')}
                        </span>
                        <i></i>
                    </div>
                </div> */}
            </div>
            <div className="cards">
                {loading ? (
                    <Loading />
                ) : 
                    (teachers && teachers.length > 0) ? teachers.map((teacher, key)=>(
                        <TutorCard tutor={teacher} locale={locale} key={key}/>
                    )) : (
                        <div className="nothing">
                            No data
                        </div>
                    )
                }
            </div>
            <Pagination/>
        </div>
    )
}

export default Tutors