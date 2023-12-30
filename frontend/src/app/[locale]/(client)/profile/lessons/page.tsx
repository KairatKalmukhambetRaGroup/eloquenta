"use client"
import React, { useState } from 'react'

import '@/styles/profile/lessons.scss';
import LessonsCard from '@/components/LessonsCard';
import Image from 'next/image';

import NoLessons from '@/assets/images/lessons-illustration.png'
import Link from 'next/link';
import CancelLessonModal from '@/components/user/CancelLessonModal';

const lessons = [
	{
		id: 1,
		teacher: {
			name: 'John Doe',
			avatar: '',
			language: 'Russian'
		},
		date: ''
	},
	{
		id: 2,
		teacher: {
			name: 'John Doe',
			avatar: '',
			language: 'Russian'
		},
		date: ''
	},
	{
		id: 3,
		teacher: {
			name: 'John Doe',
			avatar: '',
			language: 'Russian'
		},
		date: ''
	},
]

const noLessonText = {
	current: 'На сегодня у вас нет никаких уроков. :(',
	planed: 'У вас нет запланированных уроков на ближайшие несколько дней'
}

const MyLessons = () => {
	const [activeTab, setActiveTab] = useState('current');
	const [cancelId, setCancelId] = useState(null);
	return (
		<div className="lessons">
			<div className="tab-items">
				<div className={`tab-item ${activeTab == 'current' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setActiveTab('current')}}>Текущие</div>
				<div className={`tab-item ${activeTab == 'planed' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setActiveTab('planed')}}>Запланированные</div>
				<div className={`tab-item ${activeTab == 'past' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setActiveTab('past')}}>Прошедшие</div>
			</div>
			<div className="content">
				<CancelLessonModal setCancelId={setCancelId} cancelId={cancelId} />
				{lessons && lessons.length > 0 ? 
					lessons.map((lesson, key) => (
						<LessonsCard lesson={lesson} key={key} setCancelId={setCancelId} />
					))
					: 
					<div className="no-lesson">
						<Image src={NoLessons} alt='no lessons' />
						<p>{noLessonText[activeTab]}</p>
						<Link href="/tutors/english">Забронировать занятие</Link>
					</div>
				}
			</div>
		</div>
	)
}

export default MyLessons