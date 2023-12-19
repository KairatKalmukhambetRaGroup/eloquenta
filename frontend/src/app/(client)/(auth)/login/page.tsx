import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <form className='signup'>
            <div className="heading">
                <div className="title">
                    C возвращением!
                </div>
                <div className="subtitle">
                    Раскройте свой потенциал с лучшими преподавателями иностранного языка.
                </div>
            </div>
            <div className="form">
                <div className="inputs">
                    <div className="form-group">
                        <label>Электронная почта</label>
                        <input type="email" name='email'/>
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" name='password'/>
                    </div>
                </div>
                <div className="additional">
                    <label>
                        <input type="checkbox" name="remember"/>
                        <div className="checkbox"></div>
                        Запомнить меня
                    </label>
                    <Link href="/restore">
                        Забыли пароль?
                    </Link>
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value="Войти" />
                        <button><i></i> Войти через Google</button>
                    </div>
                    <p>
                        Нет аккаунта? <Link href="/signup">Создать новый аккаунт</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default page