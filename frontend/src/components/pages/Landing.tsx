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
import { useTranslations } from 'next-intl';

const lessons = [
    {
        slug: 'en',
        icon: USAFlag,
        name: 'Учителя по английскому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'kz',
        icon: KZFlag,
        name: 'Учителя по казахскому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'tr',
        icon: USAFlag,
        name: 'Учителя по турецкому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'ru',
        icon: RUFlag,
        name: 'Учителя по русскому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'fr',
        icon: FRFlag,
        name: 'Учителя по французкому',
        teachers: 2321,
        link: ''
    },
    {
        slug: 'ar',
        icon: AEFlag,
        name: 'Учителя по арабскому',
        teachers: 2321,
        link: ''
    },
]

const cardImages = [
    HowWorksImg1, HowWorksImg2, HowWorksImg3
]
const Landing = ({locale}: any) => {
    const t = useTranslations('landing');
    return (
        <div id='landing'>
            <div className="container">
                <div className="content">
                    <div className="hero">
                        <div className="text-wrapper">
                            <div className="text">
                                <div className="title">
                                    {t('hero.title.start')}
                                    <br />
                                    <span>
                                        {t('hero.title.mid')}
                                    </span> 
                                    <br />
                                    {t('hero.title.end')}
                                </div>
                                <div className="subtitle">
                                    {t('hero.subtitle')}
                                </div>
                            </div>
                            <Link href={`/${locale}/tutors/english`} className='btn'>
                                {t('hero.btn')}
                                
                                <i></i>
                            </Link>
                        </div>
                        <div className="hero-img">
                            <Image src={HeroImage} loading='lazy' alt='Hero'/>
                        </div>
                    </div>
                    <div className="lessons">
                        <div className="title">
                            {t('lessons.title.start')}
                            <span>
                                {t('lessons.title.mid')}
                            </span> 
                            {t('lessons.title.end')}
                        </div>
                        <div className="cards-wrapper">
                            <div className="cards">
                                {lessons.map((card, key)=> (
                                    <Link href={`/${locale}/tutors/${card.slug}`} key={key} className='card'>
                                        <div className="card-body">
                                            <div className="card-img">
                                                <Image loading='lazy' src={card.icon} alt={card.slug} />
                                            </div>
                                            <div className="card-text">
                                                <div className="name">
                                                    {t(`lessons.languages.${card.slug}`)}
                                                </div>
                                                <div className="count">
                                                    {card.teachers} {t('lessons.teacher-count')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-link'>
                                            <i></i>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="btn">
                                {t('lessons.btn')}
                            </div>
                        </div>
                    </div>
                    <div className="how-works">
                        <div className="title">
                            {t('how-works.title.start')}
                            <span>
                                {t('how-works.title.mid')}
                            </span> 
                            {t('how-works.title.end')}
                        </div>
                        <div className="cards">
                            {
                                [1,2,3].map((key)=>(
                                <div className="card" key={key}>
                                    <div className="card-number">
                                        <i className={`num${key+1}`}></i>
                                    </div>
                                    <div className="card-body">
                                        <div className="text">
                                            <div className="title">
                                                {t(`how-works.cards.${key}.title`)}
                                            </div>
                                            <div className="description">
                                                {t(`how-works.cards.${key}.description`)}
                                            </div>
                                        </div>
                                        <Image src={cardImages[key-1]} className='card-img' loading='lazy' alt='img' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing