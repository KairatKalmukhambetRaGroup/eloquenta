"use client"
import React, { useEffect, useState } from 'react'

import '@/styles/admin/teachers.scss';
import Link from 'next/link';
import axios from '@/utils/axiosConfig';
import TeacherCard from '@/components/admin/TeacherCard';
import Pagination from '@/components/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Teachers = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const langT = useTranslations('languages');


    const [teachers, setTeachers] = useState([]);
    const [langs, setLangs] = useState<any[]>([]);
    const lang = searchParams.get('lang') ? searchParams.get('lang') : '';

    const getTeachers = async ()  => {
        try {
            const {data} = await axios.get(`/teachers/getAllTeachers?${searchParams.toString()}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setTeachers(data);
            // setTeachers(data.teachers);

            // const current = new URLSearchParams(Array.from(searchParams.entries()));
            // current.set("page", data.page);
            // current.set("pages", data.totalPages);
            // const search = current.toString();
            // const query = search ? `?${search}` : "";
            // router.replace(`${pathname}${query}`)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTeachers();
    }, [searchParams])


    const getLangs = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/language/getAllLanguages`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLangs(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=> {
        if(!langs || langs.length == 0)
            getLangs();
    }, [langs])

    const handleLangCheck = (e: any) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("lang", value);
        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`)
    }

    return (
        <div id="teachers">
            <div className="heading">
                Учителя 
                <Link href="/admin/teachers/new" className='add-teacher'>
                    Добавить учителя
                </Link>
            </div>
            <div className="list-wrapper">
                <div className="filters">
                    <select value={lang ? lang : ''} name='lang' onChange={handleLangCheck}>
                        <option value=""></option>
                        {langs.map((item, key)=>(
                            <option key={key} value={item.slug}>{langT(item.slug)}</option>
                        ))}
                    </select>
                </div>
                <div className="teachers-list">
                    {teachers ? teachers.map((teacher, key) => (
                        <TeacherCard key={key} teacher={teacher} />
                    )) : (
                        <div className="loading"></div>
                    ) }
                </div>
                <Pagination />
            </div>
        </div>
    )
}

export default Teachers