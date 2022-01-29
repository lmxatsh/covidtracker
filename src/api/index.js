import axios from 'axios'
const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    try {
        const requestUrl =
            country === 'global' ? `${url}` : `${url}/countries/${country}`
        console.log({requestUrl})
        const {
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await axios.get(requestUrl)
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        }
    } catch (error) {
        console.error({ error })
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        return data.map((_) => ({
            confirmed: _.confirmed,
            deaths: _.deaths,
            reportDate: _.reportDate,
        }))
    } catch (error) {
        console.error({ error })
    }
}

export const fetchCountriesData = async () => {
    try {
        const {
            data: { countries },
        } = await axios.get(`${url}/countries`)
        return countries.map((_) => _.name)
    } catch (error) {
        console.error({ error })
    }
}
