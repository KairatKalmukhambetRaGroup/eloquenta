"use client"
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axiosConfig';

import '@/styles/profile/lessons.scss';
import LessonsCard from '@/components/LessonsCard';
import Image from 'next/image';

import NoLessons from '@/assets/images/lessons-illustration.png'
import Link from 'next/link';
import CancelLessonModal from '@/components/user/CancelLessonModal';
import { useUserContext } from '@/contexts/UserContext';
import { useTranslations } from 'next-intl';


const now = Math.floor(new Date().getTime() / 1000);

const MyLessons = () => {
	const t = useTranslations("profile.lessons");
	const [activeTab, setActiveTab] = useState('current');
	const [cancelId, setCancelId] = useState(null);
    const [lessons, setLessons] = useState<any[]>();
	const {user} = useUserContext();
	const getLessons = async () => {
		try {
			const {data} = await axios.get(`/lessons/getMyLessons`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
			if(user.role == 'ROLE_TEACHER'){
				setLessons(data.filter((l: any)=>l.student != null))
			}else{
				setLessons(data)
			}

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		// if(!lessons && user)
		// console.log(lessons)
		if(user)
			getLessons()

	}, [user])

	const filterFunction = (lesson: any, activeTab: any) => {
		const today = new Date(0);
		today.setUTCSeconds(now);
		const todayString = today.toDateString();
		const lessonDay = new Date(lesson.time);
		// lessonDay.setUTCSeconds(lesson.time);
		const lessonDayString = lessonDay.toDateString();
		// console.log()
		switch (activeTab) {
			case 'current':
				if(lessonDay > today && todayString == lessonDayString){
					return true;
				}
				return false;
			case 'planed':
				if(lessonDay > today && todayString != lessonDayString){
					return true;
				}
				return false;

			case 'past':
				if(lessonDay < today){
					return true;
				}
				return false;

			default:
				return false;
		}
	}

	return (
		<div className="lessons">
			<div className="tab-items">
				<div className={`tab-item ${activeTab == 'current' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setActiveTab('current')}}>{t('tabs.current')}</div>
				<div className={`tab-item ${activeTab == 'planed' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setActiveTab('planed')}}>{t('tabs.planed')}</div>
				<div className={`tab-item ${activeTab == 'past' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setActiveTab('past')}}>{t('tabs.past')}</div>
			</div>
			<div className="content">
				<CancelLessonModal setCancelId={setCancelId} cancelId={cancelId} />
				{lessons && lessons.filter((l) => filterFunction(l, activeTab)).length > 0 ? 
					lessons.filter((l) => filterFunction(l, activeTab)).map((lesson, key) => (
						<LessonsCard lesson={lesson} key={key} setCancelId={setCancelId} activeTab={activeTab} />
					))
					: 
					<div className="no-lesson">
						<Image src={NoLessons} alt='no lessons' />
						<p>{t(`noLesson.${activeTab}`)}</p>
						<Link href="/tutors?lang=en">{t(`book`)}</Link>
					</div>
				}
			</div>
		</div>
	)
}

export default MyLessons;