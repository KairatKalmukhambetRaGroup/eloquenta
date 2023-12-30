import React from 'react'

import '@/styles/admin/report.scss';
import ReportTable from '@/components/admin/ReportTable';
import ReportChart from '@/components/admin/ReportChart';



const page = () => {
	return (
		<div id="reports">
			<h1>Отчет</h1>
			<ReportChart />
			<ReportTable />
		</div>
	)
}

export default page