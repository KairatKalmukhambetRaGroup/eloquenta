"use client"
import { useUserContext } from '@/contexts/UserContext';
import axios from '@/utils/axiosConfig';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

interface TeacherEducation{
    university: string,
    degree: string,
    enrollDate: string,
    graduationDate: string,
    isStudying: boolean
}
interface TeacherInfo {
    description: string,
    educations: TeacherEducation[]
}

const Profile = ({params: {locale}}: any) => {
    const t = useTranslations('tutor.about')
    const {user} = useUserContext();
    const [data, setData] = useState<TeacherInfo>(); 
    const getInfo = async () => {
        try {
            const {data} = await axios.get(`/teachers/getTeacherInfoByUserId/${user.id}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(!data && user && user.id)
            getInfo();
    }, [data, user])

    return (
        <div className="profile-content about">
            <h2>{t('title')}</h2>
            <p>
                {(data && data.description) ? 
                    data.description :
                    'Нет данных'
                }
            </p>
            <h2>{t('education')}</h2>
            <ul>
                {(data && data.educations.length > 0) ? data.educations.map((edu, key)=> (
                    <li key={key}>
                        <div className="year">{new Date(edu.enrollDate).getFullYear()} — {new Date(edu.graduationDate).getFullYear()}</div>
                        <div className="institution">
                            <span>{edu.university}</span>   
                            {edu.degree}
                        </div>                    
                    </li>
                )) : 
                    'Нет данных'
                }
            </ul>
        </div>
    )
}

export default Profile