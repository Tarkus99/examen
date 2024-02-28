import React, { useEffect, useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { getForecast, getForecastFromCoordinates } from '../fetching'
import { DateTime } from 'luxon'
import { CurrentInfo } from '../components/CurrentInfo'
import { Oval } from 'react-loader-spinner'
import { CurrentInfoDetail } from '../components/CurrentInfoDetail'

export const Dashborad = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = (city) => {
        setLoading(true);
        getForecast(city)
            .then(info => setData(info))
            .catch(err => alert('Ha ocurrido un error'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (navigator.geolocation) {
            (navigator.geolocation.getCurrentPosition((position) => {
                getForecastFromCoordinates(position.coords.latitude, position.coords.longitude)
                    .then(info => { console.log(info); setData(info) })
                    .catch(err => { console.log(err); alert('Se ha producido un error') })
                    .finally(() => setLoading(false))
            }));
        } else {
            alert('No se ha podido acceder a la ubicación')
        }
    }, [])

    return (
        <main className='p-5 w-10/12 mx-auto flex flex-col gap-10 items-center bg-cyan-700 rounded-sm relative'>
            <SearchBar fetchData={fetchData} />
            <h1 className='text-4xl text-white text-center'>PREDICCIÓN  5 DÍAS <br></br> <i className='text-emerald-400'>{data ? `${data.city.name}, ${data.city.country}` : ''}</i></h1>
            <div className='grid grid-cols-5 gap-5 w-full relative min-h-[20vh]'>
                {loading ? <Oval wrapperStyle={{ position: 'absolute', top: 0, bottom: 0, left: 0, backgroundColor: 'rgba(242, 242, 242, .8)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }} /> : ''}
                {data && data.list.filter((item, index) => {
                    if (index === 0)
                        if (DateTime.fromSQL(item.dt_txt).hour > 12)
                            return true;
                    return DateTime.fromSQL(item.dt_txt).hour === 12
                })
                    .map((item, index) => {
                        if (index < 5)
                            return <CurrentInfoDetail data={item} />
                    })}
            </div>
        </main>
    )
}
