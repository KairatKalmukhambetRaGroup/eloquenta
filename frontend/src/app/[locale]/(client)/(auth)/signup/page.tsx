'use client'
import GoogleButton from '@/components/auth/GoogleButton';
import { useUserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useState } from 'react'

const initFormData = {name: '', surname: '', email: '', password: ''};
const page = () => {
    const t = useTranslations('auth')
    const {login} = useUserContext();
    const [formData, setFormData] = useState(initFormData);
    const [error, setError] = useState(0);
    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(0);
        try {
            const {data, status} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
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
                    {t('signup.title')}
                </div>
                <div className="subtitle">
                    {t('signup.subtitle')}
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
                        <label>{t('inputs.name')}</label>
                        <input type="text" name='name' value={formData.name} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.surname')}</label>
                        <input type="text" name='surname' value={formData.surname} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.email')}</label>
                        <input type="email" name='email' value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.password')}</label>
                        <input type="password" name='password' value={formData.password} onChange={handleChange}/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value={t('signup.btn')} />
                        <GoogleButton text={t('signup.google')} />
                    </div>
                    <p>
                        {t('signup.account.start')} <Link href="/login">{t('signup.account.end')}</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default page