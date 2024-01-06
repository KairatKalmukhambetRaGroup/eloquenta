import React from 'react';

import '@/styles/profile/teacherSidebar.scss';
import TeacherInt from '@/assets/images/tutor-image-init.png';
import Image from 'next/image';

const TeacherProfileSidebar = () => {
    return (
        <div id="teacherProfileSidebar">
            <div className="sidebar-body">
                <div className="img">
                    <Image src={TeacherInt} alt='teacher image' />
                </div>
                <div className="text">
                    <div className="heading">
                        <div className="name">
                            Имя Фамилия
                            <i></i>
                        </div>
                        <div className="badge">
                            Турецкий
                        </div>
                    </div>
                    <div className="langs">
                        <i></i>
                        Владеет английским (родным), русским, казахским языками
                    </div>
                    <div className="price">
                        $46
                        <span>/час</span>
                    </div>
                </div>
            </div>
            <div className="btn">
                Управление расписанием
            </div>
        </div>
    )
}

export default TeacherProfileSidebar