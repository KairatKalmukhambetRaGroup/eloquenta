import React from 'react'

const Settings = () => {
    return (
        <div className="profile-settings">
            <h2>Настройки профиля</h2>
            <form>
                <div className="avatar-edit">
                    <div className="avatar">

                    </div>
                    <div className="avatar-btns">
                        <label className='btn'>
                            <input type="file" name="avatar"/>
                            Изменить аватар
                        </label>
                        <div className="btn delete">
                            Удалить аватар
                        </div>
                    </div>
                </div>
                <div className="inputs">
                    <div className="row">
                        <div className="form-group">
                            <input type="text" name='firstname' required />
                            <label>Имя</label>
                        </div>
                        <div className="form-group">
                            <input type="text" name='lastname' required />
                            <label>Фамилия</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea name="about" rows={5}></textarea>
                        <label>Обо мне</label>
                    </div>
                </div>
                <input type="submit" value="Сохранить изменения" />
            </form>
        </div>
    )
}

export default Settings