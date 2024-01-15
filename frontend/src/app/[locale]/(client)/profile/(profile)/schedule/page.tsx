"use client"
import ScheduleCalendar from '@/components/tutor/ScheduleCalendar'
import { useTranslations } from 'next-intl';
import axios from '@/utils/axiosConfig';
import React, { useEffect, useState } from 'react'
import { ScheduleTime } from '../../../tutor/[id]/schedule/page';
import { convertLocalDateTimeArrayToTimestamp } from '@/utils/dateConvert';
import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

const weekdaysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

interface TeacherLanguage {
    id: number,
    isTeaching: boolean,
    lang: string,
    level: string,
    price: Number
}
const today = new Date(new Date().setHours(0,0,0,0));


const Schedule = () => {
    const t = useTranslations('tutor.schedule')
    const {user} = useUserContext();
    const dayT = useTranslations('weekdays')
    const weekdays = weekdaysArray.map((i)=> dayT(`${i}.short`))
    const [lessons, setLessons] = useState<any[]>([]);
    const [languages, setLanguages] = useState<TeacherLanguage[]>([]);
    const [modalLesson, setModalLesson] = useState(null);
    const [activeDay, setActiveDay] = useState(today.getTime());

    const getLessons = async () => {
        try {
            const {data} = await axios.get(`/lessons/getMyLessons`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLessons(data.map((i: any)=>{  
                const time = new Date(0);
                time.setUTCSeconds(i.time);
                return {...i, time};
            }));
            // setLessons(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if((!lessons || lessons.length == 0) && user && user.id)
            getLessons();
    }, [lessons, user])

    const [addLessonModal, setAddLessonModal] = useState(false);

    return (
        <div className="profile-content schedule">
            <AddLessonModal active={addLessonModal} setActive={setAddLessonModal} date={activeDay} 
                lessons={
                    lessons.filter((lesson)=>(!lesson.studentId && new Date(activeDay).getDate()) == lesson.time.getDate())
                        .map((e)=>{return e.time.toISOString()})
                } />
            <h2>{t('title')}</h2>
            <p>
                <i></i>
                {t('info')}
            </p>
            <ScheduleCalendar weekdays={weekdays} activeDay={activeDay} setActiveDay={setActiveDay}/>
            <div className="add-lesson">
                {t('add-lesson-btn')}
                <i
                    onClick={(e)=>{e.preventDefault(); setAddLessonModal(true)}}
                ></i>
            </div>
            <div className="schedule-times">
                {lessons.filter((lesson)=>(!lesson.studentId && new Date(activeDay).getDate()) == lesson.time.getDate()).map((lesson)=>{
                    return <ScheduleTime key={lesson.id} lesson={lesson} setModalLesson={setModalLesson} btnText={t('btn')} /> 
                })}
            </div>
        </div>
    )
}

export default Schedule;

const initLessonFormData = {
    time: ''
}
const AddLessonModal = ({active, setActive, date, lessons} : any) => {
    const t = useTranslations('tutor.schedule.addModal');
    const [formData, setFormData] = useState(initLessonFormData);
    let day = new Date(date);
    const router = useRouter();
    const handleChange = (e: any) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const time = new Date(day.setHours(Number(formData.time))).toISOString();
        try {
            const {data} = await axios.post(`/lessons/create`, {time},{validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
        } catch (error) {
            console.log(error)
        }
        cancel();
        router.refresh();
    }
    const cancel = () => {
        setFormData(initLessonFormData);
        setActive(false);
    }
    if(!active)
        return ;
    return (
        <div id="addLessonModal">
            <form onSubmit={handleSubmit}>
                <div className="heading">{t('heading')} {day.toLocaleDateString()}</div>
                <div className="form-group">
                    <label>{t('heading')}</label>
                        <select name="time" value={formData.time} onChange={handleChange} required>
                            <option value="">{t('placeholder')}</option>
                        {[...Array(24)].map((e, i) => {
                            let time = new Date(day.setHours(i));
                            if(!lessons.includes(time.toISOString()))
                                return <option key={i} value={i}>{time.getHours()}:00 - {time.getHours()+1}:00</option>
                        })}
                    </select>
                </div>
                <div className="btns">
                    <div className="btn" onClick={(e)=>{e.preventDefault(); cancel()}}>{t('cancel')}</div>
                    <button className="btn" type='submit'>{t('submit')}</button>
                </div>
            </form>           
        </div>
    )
}