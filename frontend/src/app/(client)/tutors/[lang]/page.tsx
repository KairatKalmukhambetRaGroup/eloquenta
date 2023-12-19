import TutorsSidebarFilter from '@/components/tutor/TutorsSidebarFilter'
import React from 'react'

import '@/styles/tutors/tutors.scss'
import TutorCard from '@/components/tutor/TutorCard'
import TutorImageInit from '@/assets/images/tutor-image-init.png';
import Pagination from '@/components/Pagination';
import TutorHero from '@/components/tutor/TutorHero';

const tutorInit = {
    id: '1',
    image: TutorImageInit,
    name: 'Имя Фамилия',
    nation: 'kz',
    lang: 'tr',
    langs: ['eng','ru','kz'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi velit, suscipit nec ligula sit amet, molestie scelerisque nisl.',
    rating: {
        value: '4.9',
        count: '11'
    },
    price: '46',
}

const Page = () => {
    return (
        <div id="tutors">
            <div className="container">
                <div className="content">
                    <TutorHero />
                    <div className="tutors-wrapper">
                        <div className="title">
                            Найди для себя <span>подходящего</span> учителя
                        </div>
                        <div className="tutors">
                            <TutorsSidebarFilter />
                            <div className="cards-wrapper">
                                <div className="heading">
                                    <div className="title">
                                        Все учителя
                                    </div>
                                    <div className="sort">
                                        <div className="current">
                                            Сортировать по
                                            <span className="value">
                                                наши лучшие варианты
                                            </span>
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="cards">
                                    <TutorCard tutor={tutorInit} />
                                    <TutorCard tutor={tutorInit} />
                                    <TutorCard tutor={tutorInit} />
                                    <TutorCard tutor={tutorInit} />
                                    <TutorCard tutor={tutorInit} />
                                    <TutorCard tutor={tutorInit} />
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