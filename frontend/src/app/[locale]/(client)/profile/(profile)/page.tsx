import TeacherProfile from '@/components/user/TeacherProfile';
import { useTranslations } from 'next-intl';
import React from 'react'

const Profile = ({params: {locale}}: any) => {
    const t = useTranslations('tutor.about')

    return (
        <div className="profile-content about">
            <h2>{t('title')}</h2>
            <p>
                Как полиглот, я люблю преподавать и учиться.
                <br />
                <br />
                Нам доставляет удовольствие обучать своих студентов одному уровню CEFR за 6 недель.
                <br />
                <br />
                Интенсивные занятия - не единственный вариант.
                <br />
                <br />
                Если вам нравятся сложные задачи в обучении или вам необходимо изучать язык для удовольствия, по академическим или профессиональным причинам.
            </p>
            <h2>{t('education')}</h2>
            <ul>
                <li>
                    <div className="year">2020 — 2022</div>
                    <div className="institution">
                        <span>Yerevan State University</span>   
                        Ph.D in Philology 
                    </div>                    
                </li>
                <li>
                    <div className="year">2018 — 2020</div>
                    <div className="institution">
                        <span>Yerevan State University</span>    
                        Master's degree
                    </div>                    
                </li>
                <li>
                    <div className="year">2014 — 2018</div>
                    <div className="institution">
                        <span>Ijevan Branch of Yerevan State University</span>    
                        Bachelor's degree
                    </div>                    
                </li>
            </ul>
        </div>
    )
}

export default Profile