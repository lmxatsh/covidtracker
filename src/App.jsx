import { useState, useEffect } from 'react'
import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

function App() {
    const [data, setData] = useState('')

    useEffect(() => {
        const runAsync = async () => {
            const fetchedData = await fetchData()
            setData(fetchedData)
        }
        runAsync().catch((err) => console.error(err))
    }, [])

    console.log(data)
    return (
        <>
            <h1>React App</h1>
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker data={data} />
                <Chart data={data} />
            </div>
        </>
    )
}

export default App
