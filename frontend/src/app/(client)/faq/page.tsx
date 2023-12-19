"use client"

import '@/styles/faq.scss';
import { useState } from 'react';

const faqs = [
    {
        category: 'Регистрация и Учетные Записи',
        cards: [
            {
                question: 'Как я могу зарегистрироваться на вашем сайте?',
                answer: 'Чтобы зарегистрироваться, просто нажмите на кнопку "Регистрация" в верхнем углу главной страницы и заполните необходимую информацию. После подтверждения регистрации по электронной почте вы сможете войти в свой аккаунт и начать изучение языков.'
            },
            {
                question: 'Забыл(а) пароль от учетной записи. Как его восстановить?',
                answer: 'Чтобы зарегистрироваться, просто нажмите на кнопку "Регистрация" в верхнем углу главной страницы и заполните необходимую информацию. После подтверждения регистрации по электронной почте вы сможете войти в свой аккаунт и начать изучение языков.'
            }
        ]
    },
    {
        category: 'Курсы и Программы',
        cards: [
            {
                question: 'Как выбрать подходящий языковой курс?',
                answer: 'Чтобы зарегистрироваться, просто нажмите на кнопку "Регистрация" в верхнем углу главной страницы и заполните необходимую информацию. После подтверждения регистрации по электронной почте вы сможете войти в свой аккаунт и начать изучение языков.'
            },
            {
                question: 'Можно ли изменить курс после начала обучения?',
                answer: 'Чтобы зарегистрироваться, просто нажмите на кнопку "Регистрация" в верхнем углу главной страницы и заполните необходимую информацию. После подтверждения регистрации по электронной почте вы сможете войти в свой аккаунт и начать изучение языков.'
            }
        ]
    },
]

const FAQ = () => {
    const [activeFAQ, setActiveFAQ] = useState<string>('');

    const handleClick = (i: string | number, j: string | number) => {
        let tmp = `${i}_${j}`;
        setActiveFAQ(prev => prev == tmp ? '' : tmp);
    }

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