import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const t = useTranslations('auth')
    return (
        <form className='signup'>
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
                        <input type="email" name='email'/>
                    </div>
                    <div className="form-group">
                        <label>{t('inputs.password')}</label>
                        <input type="password" name='password'/>
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