"use client"
import React, { useState } from 'react'
import axios from '@/utils/axiosConfig';
import { useUserContext } from '@/contexts/UserContext';

const initFormData = {
    oldPassword: '',
    newPassword: '',
    rePassword: ''
}
const Password = () => {
    const [formData, setFormData] = useState(initFormData);
    const {rewriteProfile} = useUserContext();
    
    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const {data, status} = await axios.post(`/users/update-password`, formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            if(status == 200){
                setFormData(initFormData);
                rewriteProfile(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function checkFormData() {
        if(!formData.oldPassword || !formData.newPassword || !formData.rePassword)
            return true;
        if(formData.newPassword != formData.rePassword)
            return true;
        return false;
    }

    return (
        <div className="password-settings">
            <h2>Настройки пароля</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="row">
                        <div className="form-group">
                            <input type="password" name='oldPassword' required value={formData.oldPassword} onChange={handleChange} />
                            <label>Текущий пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <input type="password" name='newPassword' required value={formData.newPassword} onChange={handleChange} />
                            <label>Новый пароль</label>
                        </div>
                        <div className="form-group">
                            <input type="password" name='rePassword' required value={formData.rePassword} onChange={handleChange} />
                            <label>Подтвердить новый пароль</label>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Поменять пароль" disabled={checkFormData()} />
            </form>
        </div>
    )
}

export default Password