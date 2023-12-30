import React from 'react'
import '@/styles/tutors/filter.scss';
import { useTranslations } from 'next-intl';

const TutorsSidebarFilter = () => {
    const t = useTranslations('tutors.filter');
    const langT = useTranslations('languages');
    const dayT = useTranslations('weekdays');
    const langs = ['en', 'tr', 'kz', 'ar', 'ja', 'ru', 'ko', 'fr', 'zh', 'es', 'it'];
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return (
        <div id="tutorsFilter">
            <div className="heading">
                {t('title')}
            </div>
            <div className="inputs">
                <div className="input input-range">
                    <label>{t('lesson-price')}</label>
                    <div className="input-row">
                        <input type="text" name='mincost' placeholder='Min'/>
                        <input type="text" name='mincost' placeholder='Max'/>
                    </div>
                </div>
                <div className="input input-radio">
                    <label>{t('language')}</label>
                    <div className="input-options">
                        {langs.map((lang, key)=>(
                            <label className='radio' key={key}>
                                <input type="radio" name="lang" value={lang}/>
                                <i></i>
                                {langT(lang)}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="input input-checkbox">
                    <label>{t('lesson-time')}</label>
                    <div className="input-options">
                        {weekdays.map((day, key)=> (
                            <label className='checkbox' key={key}>
                                <input type="checkbox" name="day" value={day}/>
                                <i></i>
                                {dayT(`${day}.long`)}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="input input-checkbox">
                    <label>{t('lesson-time')}</label>
                    <div className="input-options">
                        <label className='checkbox'>
                            <input type="checkbox" name="time"/>
                            <i></i>
                            00:00 - 08:00
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="time"/>
                            <i></i>
                            08:00 - 12:00
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="time"/>
                            <i></i>
                            12:00 - 20:00
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="time"/>
                            <i></i>
                            20:00 - 00:00
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorsSidebarFilter