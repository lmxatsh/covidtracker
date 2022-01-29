import { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@mui/material'
import styles from './CountryPicker.module.css'
import { fetchCountriesData } from '../../api'

const CountryPicker = ({ setCountry }) => {
    const [countriesData, setCountriesData] = useState([])
    useEffect(() => {
        const runAsync = async () => {
            const fetchedData = await fetchCountriesData()
            setCountriesData(fetchedData)
        }
        runAsync()
    }, [])

    return (
        <FormControl>
            <NativeSelect
                defaultValue="global"
                onChange={(e) => setCountry(e.target.value)}
            >
                <option value="global">Global</option>
                {countriesData.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
