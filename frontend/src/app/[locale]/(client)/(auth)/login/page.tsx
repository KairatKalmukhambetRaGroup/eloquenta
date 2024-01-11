"use client"
import { useUserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useState } from 'react'

const initFormData = {email: '', password: ''};
const page = () => {
    const t = useTranslations('auth')
    const {login} = useUserContext();
    const [formData, setFormData] = useState(initFormData);
    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const {data, status} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            // console.log(data, status);
            login(data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className='signup' onSubmit={handleSubmit}>
            <div className="heading">
                <div className="title">
                    {t('login.title')}
                </div>
                <div className="subtitle">
                    {t('login.subtitle')}
                </div>
            </div>
            <div className="form">
                <div className="inputs">
                    <div className="form-group">
                        <label>{t('inputs.email')}</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.password')}</label>
                        <input type="password" name='password' value={formData.password} onChange={handleChange}/>
                    </div>
                </div>
                <div className="additional">
                    <label>
                        <input type="checkbox" name="remember"/>
                        <div className="checkbox"></div>
                        {t('login.remember')}
                    </label>
                    <Link href="/restore">
                        {t('login.restore')}
                    </Link>
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value={t('login.btn')} />
                        <button><i></i> {t('login.google')}</button>
                    </div>
                    <p>
                        {t('login.noaccount.start')} <Link href="/signup">{t('login.noaccount.end')}</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default page