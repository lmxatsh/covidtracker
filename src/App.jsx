import { useState, useEffect } from 'react'
import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

function App() {
    const [data, setData] = useState('')
    const [country, setCountry] = useState('global')

    useEffect(() => {
        const runAsync = async () => {
            const fetchedData = await fetchData(country)
            setData(fetchedData)
            console.log({ fetchedData })
        }
        runAsync().catch((err) => console.error(err))
    }, [country])

    console.log({ country })

    return (
        <>
            <h1>React App</h1>
            <div className={styles.container}>
                <Cards data={data} />
                <CountryPicker setCountry={setCountry} />
                <Chart data={data} country={country} />
            </div>
        </>
    )
}

export default App
