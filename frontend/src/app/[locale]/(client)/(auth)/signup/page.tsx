import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const t = useTranslations('auth')
    return (
        <form className='signup'>
            <div className="heading">
                <div className="title">
                    {t('signup.title')}
                </div>
                <div className="subtitle">
                    {t('signup.subtitle')}
                </div>
            </div>
            <div className="form">
                <div className="inputs">
                    <div className="form-group">
                        <label>{t('inputs.name')}</label>
                        <input type="text" name='name'/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.email')}</label>
                        <input type="email" name='email'/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.password')}</label>
                        <input type="password" name='password'/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value={t('signup.btn')} />
                        <button><i></i> {t('signup.google')}</button>
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