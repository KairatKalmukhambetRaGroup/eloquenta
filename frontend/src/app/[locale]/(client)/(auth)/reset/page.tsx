"use client"
import GoogleButton from '@/components/auth/GoogleButton';
import { useUserContext } from '@/contexts/UserContext';
import axios from 'axios';
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const initFormData = {password: '', repass: '', email: '', token: '', expires: ''};
const page = () => {
    const t = useTranslations('auth')
    const {login} = useUserContext();
    const [formData, setFormData] = useState(initFormData);

    const searchParams = useSearchParams();




    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }

    useEffect(()=>{
        if(searchParams){
            const email = searchParams.get('email') || '';
            const token = searchParams.get('token') || '';
            const expires = searchParams.get('expires') || '';
            setFormData({...formData, email, token, expires});
            
        }
    },[searchParams])

    const [error, setError] = useState(0);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(0);
        try {
            const {data, status} = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/reset-pass?email=${formData.email}&token=${formData.token}&expires=${formData.expires}`,
                formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "https://server.eloquenta.academy", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});

            console.log(data, status)
            
            if(Number(status) == 200){
                login(data);
            }
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
                    {t('reset.title')}
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
                        <label>{t('inputs.newpass')}</label>
                        <input type="password" name='password' value={formData.password} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.repass')}</label>
                        <input type="password" name='repass' value={formData.repass} onChange={handleChange}/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value={t('reset.btn')} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default page