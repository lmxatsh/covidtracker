import { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import PropTypes from 'prop-types'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJs, registerables } from 'chart.js'
ChartJs.register(...registerables)

import styles from './Chart.module.css'

Chart.propTypes = {
    data: PropTypes.shape({
        confirmed: PropTypes.string,
        recovered: PropTypes.string,
        deaths: PropTypes.string,
    }),
    country: PropTypes.string,
}

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([])
    useEffect(() => {
        const runAsync = async () => {
            const fetchedData = await fetchDailyData()
            //console.log({ fetchedData })
            setDailyData(fetchedData)
        }
        runAsync()
    }, [])

    //console.log({ dailyData })

    const barChart = confirmed ? (
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
            }}
        />
    ) : (
        <h2>loading bar chart data</h2>
    )

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
            <div className={styles.container}>
                {country === 'global' ? lineChart : barChart}
            </div>
        </>
    )
}

export default Chart
