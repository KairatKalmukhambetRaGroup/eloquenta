"use client"

import '@/styles/faq.scss';
import { useEffect, useState } from 'react';

import faqRU from '@/assets/faq/ru.json';
import faqEN from '@/assets/faq/en.json';
  

const FAQ = ({params: {locale}}: any) => {
    const [activeFAQ, setActiveFAQ] = useState<string>('');

    const [faqs, setFaqs] = useState(faqRU);

    const handleClick = (i: string | number, j: string | number) => {
        let tmp = `${i}_${j}`;
        setActiveFAQ(prev => prev == tmp ? '' : tmp);
    }
    useEffect(()=>{
        if(locale == 'ru')
            setFaqs(faqRU)
        else
            setFaqs(faqEN);
    }, [locale])

    return (
        <div className="container">
            <div id="faq">
                <div className="title">FAQ и Поддержка</div>
                <div className="faqs">
                    {faqs.map((faq, i)=>(
                        <div className="category" key={i}>
                            <div className="cat-name">
                                {faq.category}
                            </div>
                            <div className="cards">
                                {faq.cards.map((card, j)=>(
                                    <div key={j} className={`card ${activeFAQ == `${i}_${j}` ? 'active': ''}`}>
                                        <div className="question">
                                            {card.question}
                                            <i onClick={e => { e.preventDefault(); handleClick(i, j)} }></i>
                                        </div>
                                        <div className="answer">
                                            {card.answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ