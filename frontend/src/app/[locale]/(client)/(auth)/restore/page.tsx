"use client"
import { useUserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const initFormData = {email: ''};
const page = () => {
    const t = useTranslations('auth')
    const [formData, setFormData] = useState(initFormData);
    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }

    const [error, setError] = useState(0);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(0);
        try {
            const {status} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/reset`, formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "https://server.eloquenta.academy", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            if(status == 200)
                setShowSuccessMessage(true);
            else if(status == 404 || status == 409){
                setError(status);
            }else{
                setError(500);
            }
        } catch (error) {
            setError(500);
        }
    }
    if(showSuccessMessage)
        return (
            <div className='reset-success'>
                <h2>{t('restore.success.title')}</h2>
                <p>{t('restore.success.message')}</p>
                <span onClick={handleSubmit}>{t('restore.success.link')}</span>
            </div>
        );
    return (
        <form className='signup' onSubmit={handleSubmit}>
            <div className="heading">
                <div className="title">
                    {t('restore.title')}
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
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value={t('restore.btn')} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default page