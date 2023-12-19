import React from 'react'
import '@/styles/tutors/filter.scss';

const TutorsSidebarFilter = () => {
    return (
        <div id="tutorsFilter">
            <div className="heading">
                Фильтры
            </div>
            <div className="inputs">
                <div className="input input-range">
                    <label>Цена за урок</label>
                    <div className="input-row">
                        <input type="text" name='mincost' placeholder='Min'/>
                        <input type="text" name='mincost' placeholder='Max'/>
                    </div>
                </div>
                <div className="input input-radio">
                    <label>Выбор языка</label>
                    <div className="input-options">
                        <label className='radio'>
                            <input type="radio" name="lang" value="en"/>
                            <i></i>
                            Английский
                        </label>
                        <label className='radio'>
                            <input type="radio" name="lang" value="ru"/>
                            <i></i>
                            Русский
                        </label>
                        <label className='radio'>
                            <input type="radio" name="lang" value="kz"/>
                            <i></i>
                            Казахский
                        </label>
                    </div>
                </div>
                <div className="input input-checkbox">
                    <label>Время занятий</label>
                    <div className="input-options">
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Понедельник
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Вторник
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Среда
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Четверг
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Пятница
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Суббота
                        </label>
                        <label className='checkbox'>
                            <input type="checkbox" name="day"/>
                            <i></i>
                            Воскресенье
                        </label>
                    </div>
                </div>
                <div className="input input-checkbox">
                    <label>Время занятий</label>
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