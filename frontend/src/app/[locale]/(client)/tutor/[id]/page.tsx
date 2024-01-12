"use client"
import '@/styles/tutors/tutor.scss';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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

const page = ({params: {id}}:any) => {
    const t = useTranslations('tutor.about')
    const [data, setData] = useState<TeacherInfo>()
    const getInfo = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teachers/getTeacherInfoById/${id}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(!data && id)
            getInfo();
    }, [data, id])
    if(!data)
        return;
    return (
        <div className="about-teacher">
            <h2>{t('title')}</h2>
            <p>
                {data.description}
            </p>
            {data.educations && data.educations.length > 0 && (
                <>
                    <h2>{t('education')}</h2>
                    <ul>
                        {data.educations.map((edu, key)=> (
                            <li key={key}>
                                <div className="year">{new Date(edu.enrollDate).getFullYear()} — {new Date(edu.graduationDate).getFullYear()}</div>
                                <div className="institution">
                                    <span>{edu.university}</span>   
                                    {edu.degree}
                                </div>                    
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default page