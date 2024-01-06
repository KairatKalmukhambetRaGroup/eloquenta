import React from 'react'

import '@/styles/admin/teachers.scss';
import Link from 'next/link';
import TeacherCard from '@/components/admin/TeacherCard';
import Pagination from '@/components/Pagination';

const Teachers = () => {
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
                    <select name="" id="">
                        <option value="">Язык</option>
                        <option value="en">Английский</option>
                        <option value="ru">Руский</option>
                        <option value="kz">Казахский</option>
                    </select>
                </div>
                <div className="teachers-list">
                    <TeacherCard />
                    <TeacherCard />
                    <TeacherCard />
                    <TeacherCard />
                    <TeacherCard />
                    <TeacherCard />
                    <TeacherCard />
                    <TeacherCard />
                </div>
                <Pagination currentPage={1} totalPages={10} />
            </div>
        </div>
    )
}

export default Teachers