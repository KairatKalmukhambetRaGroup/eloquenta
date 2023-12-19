import React from 'react'

const Notifications = () => {
    return (
        <div className="notification-settings">
            <h2>Настройки уведомлений</h2>
            <form>
                <div className="inputs">
                    <div className="row">
                        <div className="inputs-group">
                            <h3>Аккаунт</h3>
                            <div className="checkboxes">
                                <label className='checkbox-round'>
                                    Lorem ipsum dolor sit amet
                                    <input type="checkbox" name='old' />
                                    <span></span>
                                </label>
                                <label className='checkbox-round'>
                                    Lorem ipsum dolor sit amet
                                    <input type="checkbox" name='old' />
                                    <span></span>
                                </label>
                                <label className='checkbox-round'>
                                    Lorem ipsum dolor sit amet
                                    <input type="checkbox" name='old' />
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div className="inputs-group">
                            <h3>Уроки</h3>
                            <div className="checkboxes">
                                <label className='checkbox-round'>
                                    Lorem ipsum dolor sit amet
                                    <input type="checkbox" name='old' />
                                    <span></span>
                                </label>
                                <label className='checkbox-round'>
                                    Lorem ipsum dolor sit amet
                                    <input type="checkbox" name='old' />
                                    <span></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Сохранять изменения" />
            </form>
        </div>
    )
}

export default Notifications