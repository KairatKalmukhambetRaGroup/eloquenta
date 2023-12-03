import '@/styles/landing.scss';
import Image from 'next/image';
import Link from 'next/link';

import HeroImage from '@/assets/images/hero-img.png';
import USAFlag from '@/assets/flags/usa.png';
import KZFlag from '@/assets/flags/kz.png';
import RUFlag from '@/assets/flags/ru.png';
import FRFlag from '@/assets/flags/fr.png';
import AEFlag from '@/assets/flags/ae.png';

import HowWorksImg1 from '@/assets/images/how-works1.png';
import HowWorksImg2 from '@/assets/images/how-works2.png';
import HowWorksImg3 from '@/assets/images/how-works3.png';

const lessons = [
    {
        slug: 'english',
        icon: USAFlag,
        name: 'Учителя по английскому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'kazakh',
        icon: KZFlag,
        name: 'Учителя по казахскому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'turkish',
        icon: USAFlag,
        name: 'Учителя по турецкому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'russian',
        icon: RUFlag,
        name: 'Учителя по русскому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'french',
        icon: FRFlag,
        name: 'Учителя по французкому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'arab',
        icon: AEFlag,
        name: 'Учителя по арабскому',
        teachers: 2321,
        link: ''
    },
]
const Landing = () => {
    return (
        <div id='landing'>
            <div className="container">
                <div className="content">
                    <div className="hero">
                        <div className="text-wrapper">
                            <div className="text">
                                <div className="title">
                                    Найди для себя
                                    <br />
                                    <span>подходящего</span> 
                                    <br />
                                    учителя
                                </div>
                                <div className="subtitle">
                                    Раскройте свой потенциал с лучшими преподавателями иностранного языка.
                                </div>
                            </div>
                            <div className="btn">
                                Искать учителя
                                <i></i>
                            </div>
                        </div>
                        <Image src={HeroImage} loading='lazy' alt='Hero' className='hero-img' />
                    </div>
                    <div className="lessons">
                        <div className="title">
                            Lorem ipsum <span>dolor</span> sit amet
                        </div>
                        <div className="cards-wrapper">
                            <div className="cards">
                                {lessons.map((card, key)=> (
                                    <div key={key} className="card">
                                        <div className="card-body">
                                            <div className="card-img">
                                                <Image loading='lazy' src={card.icon} alt={card.slug} />
                                            </div>
                                            <div className="card-text">
                                                <div className="name">
                                                    {card.name}
                                                </div>
                                                <div className="count">
                                                    {card.teachers} учителей
                                                </div>
                                            </div>
                                        </div>
                                        <Link className='card-link' href={card.link}>
                                            <i></i>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="btn">
                                Показать еще
                            </div>
                        </div>
                    </div>
                    <div className="how-works">
                        <div className="title">
                            Как работает <span>eloquenta</span>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <div className="card-number">
                                    <i className='num1'></i>
                                </div>
                                <div className="card-body">
                                    <div className="text">
                                        <div className="title">
                                            Найди своего учителя
                                        </div>
                                        <div className="description">
                                            Мы свяжем вас с учителем, который будет мотивировать, бросать вызов и вдохновлять вас.
                                        </div>
                                    </div>
                                    <Image src={HowWorksImg1} className='card-img' loading='lazy' alt='img' />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-number">
                                    <i className='num2'></i>
                                </div>
                                <div className="card-body">
                                    <div className="text">
                                        <div className="title">
                                            Начинай учиться
                                        </div>
                                        <div className="description">
                                            Ваш учитель проведет вас по вашему первому уроку и поможет спланировать ваши следующие шаги.
                                        </div>
                                    </div>
                                    <Image src={HowWorksImg2} className='card-img' loading='lazy' alt='img' />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-number">
                                    <i className='num3'></i>
                                </div>
                                <div className="card-body">
                                    <div className="text">
                                        <div className="title">
                                            Говори. Прочитай. Пиши. Повторяй.
                                        </div>
                                        <div className="description">
                                            Выберите, сколько уроков вы хотите посещать каждую неделю, и приготовьтесь к достижению своих целей!
                                        </div>
                                    </div>
                                    <Image src={HowWorksImg3} className='card-img' loading='lazy' alt='img' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing