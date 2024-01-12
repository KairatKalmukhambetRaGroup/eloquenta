"use client"
import ScheduleCalendar from '@/components/tutor/ScheduleCalendar';
import '@/styles/tutors/tutor.scss';
import { convertLocalDateTimeArrayToTimestamp } from '@/utils/dateConvert';
import axios from '@/utils/axiosConfig';

import { useTimeZone, useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import {useFormatter} from 'next-intl';
import { useRouter } from 'next/navigation';

const weekdaysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const today = new Date(new Date().setHours(0,0,0,0));

interface TeacherLanguage {
    id: number,
    isTeaching: boolean,
    lang: string,
    level: string,
    price: Number
}

const page = ({params: {id}}:any) => {
    const t = useTranslations('tutor.schedule')
    const dayT = useTranslations('weekdays')
    const weekdays = weekdaysArray.map((i)=> dayT(`${i}.short`))
    const [lessons, setLessons] = useState<any[]>([]);
    const [languages, setLanguages] = useState<TeacherLanguage[]>([]);
    const [modalLesson, setModalLesson] = useState(null);
    const [activeDay, setActiveDay] = useState(today.getTime());
    const getLessons = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/lessons/getLessonsByTeacherId/${id}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLanguages(data.languages);
            setLessons(data.lessons.map((i: any)=>{  
                const dateTime = new Date(convertLocalDateTimeArrayToTimestamp(i.time)); 
                return {...i, time: dateTime};
            }));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if((!lessons || lessons.length == 0) && id)
            getLessons();
    }, [lessons, id])

    return (
        <div className="schedule-teacher">
            <LessonConfirmModal lesson={modalLesson} setLesson={setModalLesson} languages={languages} />
            <h2>{t('title')}</h2>
            <p>
                <i></i>
                {t('info')}
            </p>
            <ScheduleCalendar weekdays={weekdays} activeDay={activeDay} setActiveDay={setActiveDay}/>
            <div className="schedule-times">
                {lessons.filter((lesson)=>(!lesson.studentId && new Date(activeDay).getDate()) == lesson.time.getDate()).map((lesson)=>{
                    return <ScheduleTime key={lesson.id} lesson={lesson} setModalLesson={setModalLesson} btnText={t('btn')} /> 
                })}
            </div>
        </div>
    )
}

export default page;

export const ScheduleTime = ({lesson, btnText, setModalLesson}: any) => {
    const format = useFormatter();

    const timezoneOffset = lesson.time.getTimezoneOffset() / -60.0;
    const h = format.dateTime(lesson.time, {hour: "2-digit", minute: "2-digit"});
    return (
        <div className="schedule-time">
            <div className="time">
                {h}
                <span>GMT {timezoneOffset >= Number(0) ? `+${timezoneOffset}` : timezoneOffset}</span>
            </div>
            <div className="btn" onClick={(e)=>{e.preventDefault(); setModalLesson(lesson)}}>
                {btnText}
            </div>
        </div>
    )
};

export const LessonConfirmModal = ({lesson, setLesson, languages}: {lesson:any, setLesson:any, languages: TeacherLanguage[]}) => {
    const langT = useTranslations('languages');
    const [lang, setLang] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const {data, status} = await axios.post(`/lessons/register/${lesson.id}?lang=${lang}`,{},{validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            if(data){
                router.refresh();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const clear = (e:any) => {
        e.preventDefault();

        setLang('');
        setLesson(null);
    }

    if(!lesson || !languages || languages.length == 0)
        return;
    return (
        <div id="lessonConfirmModal">
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="modal-heading">
                        Lesson on {lesson.time.toLocaleString()}
                    </div>
                    <div className="form-group">
                        <label>Choose language</label>
                        <select name="lang" defaultValue={lang} onChange={(e)=>{e.preventDefault(); setLang(e.target.value)}}>
                            <option key="-1" value=""></option>
                            {languages.map((lang, key)=>(
                                <option key={key} value={lang.id}>{langT(lang.lang)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="btns">
                    <div className="btn" onClick={clear}>Cancel</div>
                    <button type="submit" className='btn' disabled={!lang}>Confirm</button>
                </div>
            </form>
        </div>
    );
}