import ScheduleCalendar from '@/components/tutor/ScheduleCalendar';
import '@/styles/tutors/tutor.scss';
import axios from 'axios';
import { useTranslations } from 'next-intl';

const weekdaysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const page = () => {
    const t = useTranslations('tutor.schedule')
    const dayT = useTranslations('weekdays')
    const weekdays = weekdaysArray.map((i)=> dayT(`${i}.short`))
    const getSchedule = async () => {
        const res = await axios.get('https://api.publicapis.org/entries');
        console.log(res.data)
    }
    return (
        <div className="schedule-teacher">
            <h2>{t('title')}</h2>
            <p>
                <i></i>
                {t('info')}
            </p>
            <ScheduleCalendar weekdays={weekdays}/>
            <div className="schedule-times">
                <ScheduleTime time="11:00 - 12:00" btnText={t('btn')} />
                <ScheduleTime time="13:00 - 14:00" btnText={t('btn')} />
                <ScheduleTime time="18:00 - 19:00" btnText={t('btn')} />
                <ScheduleTime time="20:00 - 21:00" btnText={t('btn')} />
            </div>
        </div>
    )
}

export default page;

export const ScheduleTime = ({time, btnText}: any) => {
    return (
        <div className="schedule-time">
            <div className="time">
                {time}
                <span>GMT +6</span>
            </div>
            <div className="btn">
                {btnText}
            </div>
        </div>
    )
};
