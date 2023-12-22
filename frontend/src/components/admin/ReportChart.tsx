"use client"
import ApexChart from 'react-apexcharts'
import React from 'react'

const ReportChart = () => {
    const option = {
        chart: {
            toolbar: {
                show: false,
            },
            id: 'apexchart',
        },
        tooltip: {
            // enabled: false,
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: () => {return ""}
                }
            }
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        colors: ['#07604B'],
        stroke: {
            width: 3,
            curve: "smooth"
        },
        title: {
            text: 'Аналитика',
            align: 'left',
            style: {
                fontSize: "24px",
                fontWeight: "600",
                color: "#1A1A1A",
                fontFamily: "__PlayfairDisplayFont_178bf3",
            }
        }
    }

    const series = [{
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
    return (
        <>
            <ApexChart type="line" options={option} series={series} height={300} width="100%" />
        </>
    )
}

export default ReportChart