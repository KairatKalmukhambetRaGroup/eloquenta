"use client"
import React, { useState } from 'react'
import Pagination from '../Pagination'

import DatePicker from 'react-flatpickr'
import "flatpickr/dist/flatpickr.css";

import '@/styles/flatpickr.scss';

const checksInit = [
	{
		id: 1,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 2,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 3,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 4,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 5,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 6,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 7,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 8,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 9,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
	{
		id: 10,
		name: 'John Doe',
		lesson: 'Английский',
		cost: '20 $',
		date: '2023-12-22 14:00:00',
		payment: 'PayPal',
		check: 'test'
	},
]

const ReportTable = () => {
    const [checks, setChecks] = useState(checksInit);
    const [search, setSearch] = useState('');

    const handleSearch = (e: any) => {
        e.preventDefault();
        console.log(search)
    }

    const [date, setDate] = useState(undefined);

    const handleDateChange = (e: any) => {
        console.log(e);
    }

    return (
        <div className="table">
            <div className="filter">
                {/* <div className="date-filter">
                    <input type="text" id="datepicker" />
                </div> */}
                <DatePicker placeholder='Период даты' options={{
                    mode: 'range', 
                    dateFormat: 'm.d.Y',
                    locale: {
                        rangeSeparator: ' - ',
                        firstDayOfWeek: 1,
                        weekdays: {
                        shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                        longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],         
                        }, 
                        months: {
                        shorthand: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                        longhand: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                        },
                    },
                    maxDate: new Date()
                }} onChange={handleDateChange} />
                <form className="search" onSubmit={handleSearch}>
                    <input type="text" placeholder='Поиск'  value={search} onChange={(e)=>{e.preventDefault(); setSearch(e.target.value)}} />
                    <svg onClick={handleSearch} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Покупатель</th>
                        <th>Урок</th>
                        <th>Стоимость</th>
                        <th>Дата</th>
                        <th>Платеж</th>
                        <th>Чек</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {checks.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.lesson}</td>
                            <td>{item.cost}</td>
                            <td>{item.date}</td>
                            <td>{item.payment}</td>
                            <td>
                                <a href="">{item.check}</a>
                            </td>
                            <td>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={1} totalPages={35} />
        </div>
    )
}

export default ReportTable