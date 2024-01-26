"use client"
import React, { useEffect, useState } from 'react'
import '@/styles/tutors/filter.scss';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TutorsSidebarFilter = () => {
    const t = useTranslations('tutors.filter');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const langT = useTranslations('languages');
    const dayT = useTranslations('weekdays');
    const [langs, setLangs] = useState<any[]>([]);

    const lang = searchParams.get('lang');
    const minPrice = searchParams.get('minPrice') ? searchParams.get('minPrice') : '';
    const maxPrice = searchParams.get('maxPrice') ? searchParams.get('maxPrice') : '';
    const days = searchParams.getAll('day');
    const times = searchParams.getAll('time');


    const getLangs = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/language/getAllLanguages`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLangs(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=> {
        if(!langs || langs.length == 0)
            getLangs();
    }, [langs])

    const handleChange = (e: any) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        switch (name) {
            case 'lang':
                current.set("lang", value);
                break;
            case 'day':
            case 'time':
                if(current.has(name, value)){
                    current.delete(name, value);
                }else{
                    current.append(name, value);
                }
                let gmt = new Date().getTimezoneOffset() / -60.0;
                current.set('gmt', gmt.toString());

                break;
            case 'minPrice':
            case 'maxPrice':
                if(value.length == 0 || !isNaN(value)){
                    if(!value){
                        current.delete(name);
                        break;
                    }

                    if(Number(value) < 0)
                        current.delete(name);
                    else if(Number(value) > 50)
                        current.set(name, '50');
                    else
                        current.set(name, value);

                    break;
                }
            default:
                break;
        }
        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`)
    }


    // const langs = ['en', 'tr', 'kz', 'ar', 'ja', 'ru', 'ko', 'fr', 'zh', 'es', 'it'];
    const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const timeValues = [
        {value: "0-8", slug: '00:00 - 08:00'},
        {value: "8-12", slug: '08:00 - 12:00'},
        {value: "12-20", slug: '12:00 - 20:00'},
        {value: "20-0", slug: '20:00 - 00:00'},
    ]
    return (
        <div id="tutorsFilter">
            <div className="heading">
                {t('title')}
            </div>
            <div className="inputs">
                <div className="input input-range">
                    <label>{t('lesson-price')} $</label>
                    <div className="input-row">
                        <input type="text" name='minPrice' placeholder='Min' value={Number(minPrice)} onChange={handleChange} />
                        <input type="text" name='maxPrice' placeholder='Max' value={Number(maxPrice)} onChange={handleChange} />
                    </div>
                </div>
                <div className="input input-radio">
                    <label>{t('language')}</label>
                    <div className="input-options">
                        {langs.map((item, key)=>(
                            <label className='radio' key={key}>
                                <input type="radio" name="lang" value={item.slug} checked={item.slug == lang} onChange={handleChange}/>
                                <i></i>
                                {langT(item.slug)}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="input input-checkbox">
                    <label>{t('lesson-time')}</label>
                    <div className="input-options">
                        {weekdays.map((day, key)=> (
                            <label className='checkbox' key={key}>
                                <input type="checkbox" name="day" value={day} checked={days.includes(day)} onChange={handleChange}/>
                                <i></i>
                                {dayT(`${day}.long`)}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="input input-checkbox">
                    <label>{t('lesson-time')}</label>
                    <div className="input-options">
                        {timeValues.map((item, key)=>(
                            <label className='checkbox' key={key}>
                                <input type="checkbox" name="time" value={item.value}  checked={times.includes(item.value)} onChange={handleChange}/>
                                <i></i>
                                {item.slug}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorsSidebarFilter