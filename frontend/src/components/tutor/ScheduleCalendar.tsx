'use client'
import React, { useState } from 'react'

const today = new Date(new Date().setHours(0,0,0,0));
const dayArrInit = [0,1,2,3,4,5,6];

const ScheduleCalendar = ({weekdays, activeDay, setActiveDay}: any) => {
    const [dayArr, setDayArr] = useState(dayArrInit)

    const prev = (e: any) => {
        e.preventDefault();
        let newArr = dayArr.map((i)=>i-7);
        
        if(newArr[0] < dayArrInit[0])
            return;

        setDayArr(newArr);
        const newActive = new Date(today);
        newActive.setDate(newActive.getDate()+newArr[newArr.length -1]);
        setActiveDay(newActive.getTime())
    }
    const next = (e:any) => {
        e.preventDefault();
        let newArr = dayArr.map((i)=>i+7);
        setDayArr(newArr);
        const newActive = new Date(today);
        newActive.setDate(newActive.getDate()+newArr[0]);
        setActiveDay(newActive.getTime())
    }
    return (
        <div className="days">
            <i className="prev" onClick={prev}></i>
            {dayArr.map((item)=>{
                const day = new Date(today);
                day.setDate(day.getDate()+item);
                return (
                    <div className={`day ${day.getTime() == activeDay ? 'active' : ''}`} key={item} 
                        onClick={()=>{setActiveDay(day.getTime())}}>
                        {weekdays[day.getDay()]} <br />{day.getDate()}
                    </div>
                )
            })}
            <i className="next" onClick={next}></i>
        </div>
    )
}

export default ScheduleCalendar