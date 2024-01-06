"use client"
import React, { useState } from 'react'

const formDataInit = {
    description: '',
    day: '',
    time: ''
}
const CancelLessonModal = ({setCancelId, cancelId}: any) => {
    const [formData, setFormData] = useState(formDataInit);

    const cancel = (e: any) => {
        e.preventDefault();
        setFormData(formDataInit);
        setCancelId(null);
    }
    const handleChange = (e: any) => {
        e.preventDefault();
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        console.log({...formData, id: cancelId});
        cancel(e)
    }

    if(!cancelId)
        return;
    return (
        <div id="cancelLesson">
            <form className="modal" onSubmit={handleSubmit}>
                <div className="modal-body">
                    <div className="title">
                        Вы уверены насчет отмены урока?
                    </div>
                    <div className="form-group">
                        <label>Укажите причину отмены</label>
                        <textarea name="description" rows={3} value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>День</label>
                        <select name="day" value={formData.day} onChange={handleChange}>
                            <option value="">Выберите день</option>
                            <option value="27 декабря">27 декабря</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Выберите свободного временного слота</label>
                        <select name="time" value={formData.time} onChange={handleChange}>
                            <option value="">Выберите время</option>
                            <option value="13:00 - 15:00">13:00 - 15:00</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="btn" onClick={cancel}>Отменить</div>
                    <input type="submit" className='btn confirm' value="Подтвердить" />
                </div>
            </form>
        </div>
    )
}

export default CancelLessonModal;