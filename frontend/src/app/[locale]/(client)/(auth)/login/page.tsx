"use client"
import GoogleButton from '@/components/auth/GoogleButton';
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

    const [error, setError] = useState(0);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(0);
        try {
            const {data, status} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "https://server.eloquenta.academy", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            if(status == 200)
                login(data);
            else if(status == 404 || status == 409){
                setError(status);
            }else{
                setError(500);
            }
        } catch (error) {
            setError(500);
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
            {error ? 
                <div className="error">
                    {t(`error.${error}`)}
                </div>
                :
                ''
            }
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
                        <GoogleButton text={t('login.google')} />
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