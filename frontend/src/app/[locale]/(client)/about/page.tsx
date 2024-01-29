import React from 'react'

import '@/styles/about.scss';
import { useTranslations } from 'next-intl';


const About = () => {
    const t = useTranslations("about");
    return (
        <div className="container">
            <div id="about">
                <h1>
                    {t('title')}
                </h1>
                <p>
                    {t('us')}
                </p>
                <div className="content">
                    <div className="content-text">
                        <i></i>
                        <h2>
                            {t('nurzhan.title')} 
                        </h2>
                        <p>
                            {t('nurzhan.description')} 
                        </p>
                    </div>
                    <div className="image">
                        <div className="text">
                            {t('nurzhan.name')}                     
                            <span>  
                                {t('nurzhan.position')}     
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About