import React from 'react'

import '@/styles/profile/lessons.scss';
import LessonsCard from '@/components/LessonsCard';

const lessons = [
	{
		teacher: {
			name: 'John Doe',
			avatar: '',
			language: ''
		},
		date: ''
	},
]

const MyLessons = () => {
	return (
		<div className="lessons">
			<div className="tab-items">
				<div className="tab-item active">Текущие</div>
				<div className="tab-item">Запланированные</div>
				<div className="tab-item">Прошедшие</div>
			</div>
			<div className="content">
				<LessonsCard />
			</div>
		</div>
	)
}

export default MyLessons