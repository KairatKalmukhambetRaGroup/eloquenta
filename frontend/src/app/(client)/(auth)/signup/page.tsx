import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <form className='signup'>
            <div className="heading">
                <div className="title">
                    Присоединяйтесь к Eloquenta
                </div>
                <div className="subtitle">
                    Раскройте свой потенциал с лучшими преподавателями иностранного языка.
                </div>
            </div>
            <div className="form">
                <div className="inputs">
                    <div className="form-group">
                        <label>Имя & Фамилия</label>
                        <input type="text" name='name'/>
                    </div>
                    <div className="form-group">
                        <label>Электронная почта</label>
                        <input type="email" name='email'/>
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" name='password'/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="btns">
                        <input type="submit" value="Создать аккаунт" />
                        <button><i></i> Создать аккаунт через Google</button>
                    </div>
                    <p>
                        У вас уже есть аккаунт? <Link href="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default page