"use client"
import { useUserContext } from '@/contexts/UserContext';
import axios from '@/utils/axiosConfig';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const initFormData = {
    image: null,
    avatar: '',
    name: '',
    surname: ''
}
const Settings = () => {
    const [formData, setFormData] = useState(initFormData);

    const {user, rewriteProfile} = useUserContext();
    useEffect(()=>{
        if(user){
            setFormData({...formData, avatar: user.image, name: user.name, surname: user.surname})
        }
    }, [user])

    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log(formData);
        const fd = new FormData();
        const {image, name, surname} = formData;
        if(image)
            fd.append('image', image);
        fd.append('name', name);
        fd.append('surname', surname);

        try {
            const {data, status} = await axios.post(`/users/update-user`, fd, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", "Content-Type": "multipart/form-data"}});
            rewriteProfile(data);
        } catch (error) {
            console.log(error)
        }
    }
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        setFormData({...formData, image: file});
    }
    const deletePreview = (e: any) => {
        if(user){
            setFormData({...formData, image: user.image})
        }
    }
    const deleteImage = (e: any) => {
        setFormData({...formData, image: null});
    }
    if(!user)
         return
    return (
        <div className="profile-settings">
            <h2>Настройки профиля</h2>
            <form onSubmit={handleSubmit}>
                <div className="avatar-edit">
                    <div className="avatar">
                        {formData.image ? 
                            <ImagePreview file={formData.image} />
                            :
                            formData.avatar &&
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${user.id}`} alt='preview' />
                            // <Image src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/11`} alt='preview' width={150} height={150} />
                        }
                    </div>
                    <div className="avatar-btns">
                        <label className='btn'>
                            <input type="file" name="avatar" onChange={handleImageUpload}/>
                            {formData.image ? 
                            'Изменить аватар' : 'Добавить аватар'}
                        </label>
                        {formData.image ? 
                            <div className='btn delete' onClick={deletePreview}>
                                Сбросить
                            </div>
                            :
                            formData.avatar &&
                            <div className="btn delete" onClick={deleteImage}>
                                Удалить аватар
                            </div>
                        }
                    </div>
                </div>
                <div className="inputs">
                    <div className="row">
                        <div className="form-group">
                            <input type="text" name='name' required value={formData.name} onChange={handleChange}/>
                            <label>Имя</label>
                        </div>
                        <div className="form-group">
                            <input type="text" name='surname' required value={formData.surname} onChange={handleChange}/>
                            <label>Фамилия</label>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <textarea name="about" rows={5}></textarea>
                        <label>Обо мне</label>
                    </div> */}
                </div>
                <input type="submit" value="Сохранить изменения" />
            </form>
        </div>
    )
}

export default Settings;

const ImagePreview = ({file}: any) => {
    const [preview, setPreview] = useState<any>(null);
    useEffect(()=> {
        if (file) {
            const reader = new FileReader();
      
            reader.onloadend = () => {
                setPreview(reader.result);
            };
      
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file])

    if(preview)
        return <Image src={preview} alt='preview' width={150} height={150} />
    return ;
}