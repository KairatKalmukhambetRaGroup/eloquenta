import ScheduleCalendar from '@/components/tutor/ScheduleCalendar'
import { useTranslations } from 'next-intl';
import React from 'react'
import { ScheduleTime } from '../../../tutor/[id]/schedule/page';

const weekdaysArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const Schedule = () => {
    const t = useTranslations('tutor.schedule')
    const dayT = useTranslations('weekdays')
    const weekdays = weekdaysArray.map((i)=> dayT(`${i}.short`))


    return (
        <div className="profile-content schedule">
            <h2>{t('title')}</h2>
            <p>
                <i></i>
                {t('info')}
            </p>
            <ScheduleCalendar weekdays={weekdays} />
            <div className="schedule-times">
            <ScheduleTime time="11:00 - 12:00" btnText={t('btn')} />
                <ScheduleTime time="13:00 - 14:00" btnText={t('btn')} />
                <ScheduleTime time="18:00 - 19:00" btnText={t('btn')} />
                <ScheduleTime time="20:00 - 21:00" btnText={t('btn')} />
            </div>
        </div>
    )
}

export default Schedule