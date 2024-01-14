"use client"
import { useUserContext } from '@/contexts/UserContext';
import axios from '@/utils/axiosConfig';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const initFormData = {
    image: null,
    avatar: '',
    name: '',
    surname: '',

    description: ''
}
const Settings = () => {
    const [formData, setFormData] = useState(initFormData);
    const [educations, setEducations] = useState([]);
    const [langs, setLangs] = useState([]);

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
        const {image, name, surname, description} = formData;
        if(image)
            fd.append('image', image);
        fd.append('name', name);
        fd.append('surname', surname);
        fd.append('description', description);

        educations.forEach((obj, index) => {
            // Append each property of the object to the FormData
            fd.append(`teacherEducations[${index}].id`, obj.id);
            fd.append(`teacherEducations[${index}].university`, obj.university);
            fd.append(`teacherEducations[${index}].degree`, obj.degree);
            fd.append(`teacherEducations[${index}].enrollDate.`, new Date(obj.enrollDate).toISOString());
            fd.append(`teacherEducations[${index}].graduationDate.`, new Date(obj.graduationDate).toISOString());
            fd.append(`teacherEducations[${index}].studying`, obj.studying);
        });

        langs.forEach((obj, index) => {
            // Append each property of the object to the FormData
            fd.append(`teacherLanguages[${index}].id`, obj.id);
            fd.append(`teacherLanguages[${index}].price`, obj.price);
            fd.append(`teacherLanguages[${index}].level`, obj.level);
            fd.append(`teacherLanguages[${index}].lang`, obj.lang);
            fd.append(`teacherLanguages[${index}].teaching`, obj.teaching);
        });

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
                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${user.id}`} alt='preview' />
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
                    {user.role == 'ROLE_TEACHER' && (
                        <>
                            <div className="form-group">
                                <textarea name="description" 
                                    value={formData.description} onChange={handleChange}
                                    rows={5}></textarea>
                                <label>Обо мне</label>
                            </div>
                        

                            <EducationForm educations={educations} setEducations={setEducations} />
                            <LanguageForm languages={langs} setLanguages={setLangs} />
                        
                        </>
                    )}
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

const EducationForm = ({educations, setEducations}: any) => {
    const eduInit = {
        id: '',
        university: '',
        degree: '',
        enrollDate: '',
        graduationDate: '',
        studying: false
    }
    const handleChange = (e :any) => {
        e.preventDefault();
        let {name, value} = e.currentTarget;
        let [n, index] = name.split('_');

        let obj = {...educations[index]};
        obj[n] = value;

        const updatedEdu = educations.map((ed, i) =>
            i == index ? obj : ed
        );
        setEducations(updatedEdu);
    }
    const addEducation = (e: any) => {
        e.preventDefault();
        setEducations((prev: any) => [...prev, {...eduInit}]);
    }
    const deleteEdu = (key: number) => {
        setEducations((prev: any) => {
            return prev.filter((_, i) => i !== key);
        });
    }
    return (
        <>
            <div className="heading2">
                Образование
                <i onClick={addEducation}></i>
            </div>

            {educations.map((edu:any, key:number)=>(
                <div className="education-inputs" key={key}>
                    <div className="row">
                        <div className="form-group">
                            <input type="text" name={`university_${key}`} required value={edu.university} onChange={handleChange}/>
                            <label>Уч. заведение</label>
                        </div>
                        <div className="form-group">
                            <input type="text" name={`degree_${key}`} required value={edu.degree} onChange={handleChange}/>
                            <label>Степень</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <input type="date" name={`enrollDate_${key}`} required value={edu.enrollDate} onChange={handleChange}/>
                            <label>Дата начала</label>
                        </div>
                        <div className="form-group">
                            <input type="date" name={`graduationDate_${key}`} required value={edu.graduationDate} onChange={handleChange}/>
                            <label>Дата окончания (или ожидаемая)</label>
                        </div>
                    </div>
                    <div className="delete" onClick={(e)=>{e.preventDefault(); deleteEdu(key)}}>
                        <i></i>
                        Delete
                    </div>
                </div>
            ))}     
        </>
    );
}

const LanguageForm = ({languages, setLanguages}: any) => {
    const [langs, setLangs] = useState<any[]>([]);
    const langT = useTranslations('languages');

    const getLangs = async () => {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/language/getAllLanguages`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            setLangs(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=> {
        if(!langs || langs.length == 0)
            getLangs();
    }, [langs])
    const langInit = {
        id: '',
        price: 0,
        level: '',
        lang: '',
        teaching: false
    }
    const handleChange = (e :any) => {
        // e.preventDefault();
        let {name, value, type} = e.currentTarget;
        let [n, index] = name.split('_');

        let obj = {...languages[index]};
        if(type == 'checkbox'){
            obj.teaching = e.currentTarget.checked;
        }else{
            obj[n] = value;
        }
        console.log(obj)

        const updatedEdu = languages.map((ed, i) =>
            i == index ? obj : ed
        );
        setLanguages(updatedEdu);
    }
    const addEducation = (e: any) => {
        e.preventDefault();
        setLanguages((prev: any) => [...prev, {...langInit}]);
    }
    const deleteEdu = (key: number) => {
        setLanguages((prev: any) => {
            return prev.filter((_, i) => i !== key);
        });
    }
    return (
        <>
            <div className="heading2">
                Языки
                <i onClick={addEducation}></i>
            </div>

            {languages.map((item:any, key:number)=>(
                <div className="education-inputs" key={key}>
                    <div className="row">
                        <div className="form-group">
                            <select name={`lang_${key}`} required value={item.lang} onChange={handleChange}>
                                <option value=""></option>
                                {langs.map((l, key)=>(
                                    <option key={key} value={l.slug}>
                                        {langT(l.slug)}
                                    </option>
                                ))}
                            </select>
                            <label>Язык</label>
                        </div>
                        <div className="form-group">
                            <select name={`level_${key}`} required value={item.level} onChange={handleChange}>
                                <option value=""></option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                                <option value="NATIVE">NATIVE</option>
                            </select>
                            <label>Уровень владения</label>
                        </div>
                    </div>
                    <div className="row">
                        <label className='check'>
                            <input type="checkbox" name={`teaching_${key}`} checked={item.teaching} onChange={handleChange}/>
                            Преподаваемый
                        </label>
                        {item.teaching && (
                            <div className="form-group">
                                <input type="number" name={`price_${key}`} required value={item.price} onChange={handleChange}/>
                                <label>Цена</label>
                            </div>
                        )}
                    </div>
                    <div className="delete" onClick={(e)=>{e.preventDefault(); deleteEdu(key)}}>
                        <i></i>
                        Delete
                    </div>
                </div>
            ))}     
        </>
    );
}