import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface TutorInfo {
    id: string,
    image: any,
    name: string,
    nation: string,
    lang: string,
    langs: string[],
    description: string,
    rating: {
        value: string,
        count: string
    },
    price: string
}

const TutorCard = ({tutor} : {tutor: TutorInfo}) => {
    return (
        <div className='tutor-card'>
            <div className="card-image">
                <Image src={tutor.image} alt='Tutor image' />
            </div>
            <Link href={`/tutor/${tutor.id}`} className="card-heading">
                <div className="name">{tutor.name} <i className={`nation ${tutor.nation}`}></i></div>
                <div className="lang">{tutor.lang}</div>
            </Link>
            <div className="langs">
                <i></i>
                {/* <div className="langs-content"> */}
                    Владеет {tutor.langs.map((lang)=>`${lang} `)}языками
                {/* </div> */}
            </div>
            <div className="description">
                {tutor.description}
            </div>
            <div className="card-footer">
                <div className="rating">
                    <i></i>
                    <div className="value">
                        {tutor.rating.value}
                        <span>
                            ({tutor.rating.count})
                        </span>
                    </div>
                </div>
                <div className="price">
                    <span>{tutor.price}</span>
                    /час
                </div>
            </div>
            <div className="card-btns">
                <div className="video-btn">
                    <i></i>
                </div>
                <Link href={`/tutor/${tutor.id}`} className="btn">
                    Забронировать занятие
                </Link>
            </div>
        </div>
    )
}

export default TutorCard