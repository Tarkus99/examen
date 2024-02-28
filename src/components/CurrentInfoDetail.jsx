import React from 'react'
import { DateTime } from 'luxon'

export const CurrentInfoDetail = ({ data }) => {
    return (
        <div className='flex flex-col items-center text-2xl gap-2 bg-cyan-800 text-white rounded shadow p-1'>
            <h1 className='text-emerald-400 text-3xl'>{data.name}</h1>
            <h1 className='font-bold'>{DateTime.fromSQL(data.dt_txt).toLocaleString(DateTime.DATETIME_MED)}</h1>

            <div className='p-4 bg-cyan-900 w-full flex flex-col items-center justify-center rounded-sm'>
                <h1>Máx: {data.main.temp_max}º</h1>
                <h1>Min: {data.main.temp_min}º</h1>
                <h1>S. térmica: {data.main.feels_like}º</h1>
            </div>
            <h1>Viento: {data.wind.speed} m/s</h1>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className='w-24 h-24' />
        </div>
    );
}
