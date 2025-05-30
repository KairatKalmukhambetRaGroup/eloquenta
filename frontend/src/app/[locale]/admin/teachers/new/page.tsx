'use client'
import React, { useState } from 'react'
import axios from '@/utils/axiosConfig';

import '@/styles/admin/teachers.scss';
import Image from 'next/image';

const initFormData = {
    name: '',
    surname: '',
    email: '',
}
const NewTeacher = () => {
    const [formData, setFormData] = useState(initFormData)
    // const [selectedImage, setSelectedImage] = useState('');
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const {data, status} = await axios.post(`/teachers/createTeacher`, formData, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            console.log(data, status);
            // if(status == 200){
            //     setFormData(initFormData);
            // }else{
            //     console.log(status);
            // }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e: any) =>{
        e.preventDefault();
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }
    // const handleImage = (e: any) => {
    //     if(e.target.files && e.target.files[0]){
    //         const image = e.target.files[0]
    //         setFormData({...formData, image })
    //         setSelectedImage(URL.createObjectURL(image));
    //     }
    // }
    const clear = (e: any) => {
        e.preventDefault();
        setFormData(initFormData);
        // setSelectedImage('');
    }

    return (
        <div id="newTeacher">
            <h1>
                Добавить учителя
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {/* <div className="image-input">
                        <div className="img">
                            {formData.image ? 
                                <Image src={selectedImage} alt='image' width={150} height={150} />
                                :
                                <i></i>
                            }
                        </div>
                        <label className='btn'>
                            Выбрать изображение
                            <input type="file" name="image" value='' accept='image/png, image/jpeg, image/webp, image/jpg' onChange={handleImage} required />
                        </label>
                    </div> */}
                    <div className="row">
                        <div className="form-group">
                            <label>Имя</label>
                            <input type="text" name='name' value={formData.name} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label>Фамилия</label>
                            <input type="text" name='surname' value={formData.surname}  onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <label>Почта</label>
                            <input type="email" name='email' value={formData.email} onChange={handleChange} required />
                        </div>
                        {/* <div className="form-group">
                            <label>Цена за урок $</label>
                            <input type="number" name='cost' value={formData.cost} onChange={handleChange} required />
                        </div> */}
                    </div>
                </div>
                <div className="btns">
                    <input type="submit" value="Создать" className="btn" />
                    <div className="btn cancel" onClick={clear}>Очистить</div>
                </div>
            </form>
        </div>
    )
}

export default NewTeacher