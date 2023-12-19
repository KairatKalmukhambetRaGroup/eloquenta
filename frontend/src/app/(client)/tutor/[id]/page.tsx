import '@/styles/tutors/tutor.scss';

const page = () => {
    return (
        <div className="about-teacher">
            <h2>Про учителя</h2>
            <p>
                Как полиглот, я люблю преподавать и учиться.
                <br />
                <br />
                Нам доставляет удовольствие обучать своих студентов одному уровню CEFR за 6 недель.
                <br />
                <br />
                Интенсивные занятия - не единственный вариант.
                <br />
                <br />
                Если вам нравятся сложные задачи в обучении или вам необходимо изучать язык для удовольствия, по академическим или профессиональным причинам.
            </p>
            <h2>Образование</h2>
            <ul>
                <li>
                    <div className="year">2020 — 2022</div>
                    <div className="institution">
                        <span>Yerevan State University</span>   
                        Ph.D in Philology 
                    </div>                    
                </li>
                <li>
                    <div className="year">2018 — 2020</div>
                    <div className="institution">
                        <span>Yerevan State University</span>    
                        Master's degree
                    </div>                    
                </li>
                <li>
                    <div className="year">2014 — 2018</div>
                    <div className="institution">
                        <span>Ijevan Branch of Yerevan State University</span>    
                        Bachelor's degree
                    </div>                    
                </li>
            </ul>
        </div>
    )
}

export default page