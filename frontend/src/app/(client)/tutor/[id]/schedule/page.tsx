import '@/styles/tutors/tutor.scss';

const page = () => {
    return (
        <div className="schedule-teacher">
            <h2>Расписание</h2>
            <p>
                <i></i>
                Выберите время для вашего первого урока. Время отображается в вашем местном часовом поясе.
            </p>
            <div className="days">
                <i className="prev"></i>
                <div className="day">
                    Вт<br />15
                </div>
                <div className="day active">
                    Ср<br />16
                </div>
                <div className="day">
                    Чт<br />17
                </div>
                <div className="day">
                    Пт<br />18
                </div>
                <div className="day">
                    Сб<br />19
                </div>
                <div className="day">
                    Вс<br />20
                </div>
                <i className="next"></i>
            </div>
            <div className="schedule-times">
                <div className="schedule-time">
                    <div className="time">
                        11:00 - 12:00
                        <span>GMT +6</span>
                    </div>
                    <div className="btn">
                        Выбрать
                    </div>
                </div>
                <div className="schedule-time">
                    <div className="time">
                        13:00 - 14:00
                        <span>GMT +6</span>
                    </div>
                    <div className="btn">
                        Выбрать
                    </div>
                </div>
                <div className="schedule-time">
                    <div className="time">
                        18:00 - 19:00
                        <span>GMT +6</span>
                    </div>
                    <div className="btn">
                        Выбрать
                    </div>
                </div>
                <div className="schedule-time">
                    <div className="time">
                        20:00 - 21:00
                        <span>GMT +6</span>
                    </div>
                    <div className="btn">
                        Выбрать
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page