import Link from 'next/link'
import React from 'react'

const DeleteProfile = () => {
    return (
        <div className="delete-settings">
            <h2>Удаление аккаунта</h2>
            <form>
                <div className="inputs">
                    <div className="form-group group-row">
                        <label>Почему вы хотите удалить свой аккаунт?</label>
                        <select name="reason">
                            <option value="start_problems">Проблемы при запуске</option>
                        </select>
                    </div>
                    <div className="form-group group-row">
                        <label>
                        Чтобы продолжить, введите свой пароль еще раз
                            <Link href="/auth/restore">
                                Забыли пароль?
                            </Link>
                        </label>
                        <input type="password" name='old'/>
                    </div>
                    <p>Как только вы нажмете кнопку ниже, дружеские связи и все прочие данные будут безвозвратно удалены без возможности восстановления.</p>
                </div>
                <input type="submit" value="Безвозвратно удалить мой аккаунт" />
            </form>
        </div>
    )
}

export default DeleteProfile