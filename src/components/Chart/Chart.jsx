import { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, registerables } from 'chart.js'
ChartJs.register(...registerables)

import styles from './Chart.module.css'

const Chart = () => {
    const [dailyData, setDailyData] = useState([])
    useEffect(() => {
        const runAsync = async () => {
            const fetchedData = await fetchDailyData()
            //console.log({ fetchedData })
            setDailyData(fetchedData)
        }
        runAsync()
    }, [])

    console.log({ dailyData })

    const lineChart = dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({ reportDate }) => reportDate),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed.total),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths.total),
                        label: 'deaths',
                        borderColor: 'red',
                        backgroudColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    },
                ],
            }}
        />
    ) : (
        <h2>Loading daily data</h2>
    )
    return (
        <>
            <h1>Chart</h1>
            <div className={styles.container}>{lineChart}</div>
        </>
    )
}

export default Chart
