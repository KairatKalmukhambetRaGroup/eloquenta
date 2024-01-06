import React from 'react'

import Img from '@/assets/images/tutor-image-init.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Review } from '../../../tutor/[id]/reviews/page';

const reviews = {
    all: 39,
    "5": 38,
    "4": 1,
    "3": 0,
    "2": 0,
    "1": 0
}

const rating = 4;

const Reviews = () => {
    const t = useTranslations('tutor.reviews');
    return (
        <div className="profile-content reviews">
            <h2>
                {t('title')}
            </h2>
            <div className="rating">
                <div className="value">
                    <div className="val">
                        5
                    </div>
                    <div className="rest">
                        <div className="stars">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                        <span className='count'>{t('count', {count: reviews.all})}</span>
                    </div>
                </div>
                <div className="counts">
                    <div className="count">
                        5
                        <div className="line">
                            <span style={{width: `${(reviews[5] / reviews.all) * 100}%`}}></span>
                        </div>
                        <span>
                            ({reviews[5]})
                        </span>
                    </div>
                    <div className="count">
                        4
                        <div className="line">
                            {reviews[4] > 0 && 
                                <span style={{width: `${(reviews[4] / reviews.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviews[4]})
                        </span>
                    </div>
                    <div className="count">
                        3
                        <div className="line">
                            {reviews[3] > 0 && 
                                <span style={{width: `${(reviews[3] / reviews.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviews[3]})
                        </span>
                    </div>
                    <div className="count">
                        2
                        <div className="line">
                            {reviews[2] > 0 && 
                                <span style={{width: `${(reviews[2] / reviews.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviews[2]})
                        </span>
                    </div>
                    <div className="count">
                        1
                        <div className="line">
                            {reviews[1] > 0 && 
                                <span style={{width: `${(reviews[1] / reviews.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviews[1]})
                        </span>
                    </div>
                </div>
            </div>
            <div className="reviews">
                {[...Array(5)].map((i) => ( 
                    <Review key={i} />
                ))}
                <div className="more">
                    <i></i>
                    {t('more')}
                </div>
                <div className="btn">
                    {t('btn')}
                </div>
            </div>
        </div>
    )
}

export default Reviews