import React from 'react'

const Password = () => {
    return (
        <div className="password-settings">
            <h2>Настройки пароля</h2>
            <form>
                <div className="inputs">
                    <div className="row">
                        <div className="form-group">
                            <input type="password" name='old' required />
                            <label>Текущий пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <input type="password" name='new' required />
                            <label>Новый пароль</label>
                        </div>
                        <div className="form-group">
                            <input type="password" name='retype' required />
                            <label>Подтвердить новый пароль</label>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Поменять пароль" />
            </form>
        </div>
    )
}

export default Password