"use client"
import '@/styles/tutors/tutor.scss';

import Img from '@/assets/images/tutor-image-init.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import { useEffect, useState } from 'react';

const reviewCountInit = {
    all: 0,
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
}

// const rating = 4;


const page = ({params: {id}}:any) => {
    const t = useTranslations('tutor.reviews');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewCount, setReviewCount] = useState(reviewCountInit);

    const getReviews = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews/getTeacherReviews/${id}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setRating(data.rating);
            setReviews(data.reviews);
            let r = {...reviewCount};
            data.reviews.map(i => {
                r.all ++;
                r[i.rate]++;
            })
            setReviewCount(r);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getReviews();
    }, [id])

    return (
        <div className="review-teacher">
            <h2>
                {t('title')}
            </h2>
            <div className="rating">
                <div className="value">
                    <div className="val">
                        {Math.round(rating)}
                    </div>
                    <div className="rest">
                        <div className="stars">
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                            <i></i>
                        </div>
                        <span className='count'>{t('count', {count: reviewCount.all})}</span>
                    </div>
                </div>
                <div className="counts">
                    <div className="count">
                        5
                        <div className="line">
                            {reviewCount[5] > 0 && 
                                <span style={{width: `${(reviewCount[5] / reviewCount.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviewCount[5]})
                        </span>
                    </div>
                    <div className="count">
                        4
                        <div className="line">
                            {reviewCount[4] > 0 && 
                                <span style={{width: `${(reviewCount[4] / reviewCount.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviewCount[4]})
                        </span>
                    </div>
                    <div className="count">
                        3
                        <div className="line">
                            {reviewCount[3] > 0 && 
                                <span style={{width: `${(reviewCount[3] / reviewCount.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviewCount[3]})
                        </span>
                    </div>
                    <div className="count">
                        2
                        <div className="line">
                            {reviewCount[2] > 0 && 
                                <span style={{width: `${(reviewCount[2] / reviewCount.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviewCount[2]})
                        </span>
                    </div>
                    <div className="count">
                        1
                        <div className="line">
                            {reviewCount[1] > 0 && 
                                <span style={{width: `${(reviewCount[1] / reviewCount.all) * 100}%`}}></span>
                            }
                        </div>
                        <span>
                            ({reviewCount[1]})
                        </span>
                    </div>
                </div>
            </div>
            <div className="reviews">
                {reviews.map((review, i) => ( 
                    <Review review={review} key={i} />
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

export default page


export const Review = ({review}: any) => {

    const date = new Date(0);
    date.setUTCSeconds(review.createdAt);

    return (
        <>
            <div className="review">
                <div className="reviewer-img">
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${review.reviewerId.id}`} alt='preview' />
                </div>
                <div className="review-content">
                    <div className="stars">
                        {[...Array(review.rate)].map((i, j) => ( 
                            <i className='star' key={j}></i>
                        ))}
                        {[...Array(5 - review.rate)].map((i, j) => ( 
                            <i key={j}></i>
                        ))}
                    </div>
                    <div className="text">
                        {review.text}
                    </div>
                    <div className="author">
                        {review.reviewerId.name} {review.reviewerId.surname}
                        <div className="date">{date.toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}