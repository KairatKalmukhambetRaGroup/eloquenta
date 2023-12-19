"use client"

import Image from 'next/image'
import React from 'react'
import TutorsHeroImage from '@/assets/images/tutors-hero.png'
import { useUserContext } from '@/contexts/UserContext'

const TutorHero = () => {
    const {user} = useUserContext();
    if(user)
        return ;
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="text">
                    <div className="title">
                        Lorem ipsum <span>dolor</span> sit amet
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
            <Image src={TutorsHeroImage} alt='Hero img' />
        </div>
    )
}

export default TutorHero