import React, { useEffect, useState } from 'react'
import { getCurrentFromCoordinates } from '../fetching';
import { CurrentInfo } from '../components/CurrentInfo';

export const LandingPage = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            (navigator.geolocation.getCurrentPosition((position) => {
                getCurrentFromCoordinates(position.coords.latitude, position.coords.longitude)
                    .then(info => { setData(info) })
                    .catch(err => { alert('Se ha producido un error') })
                    .finally(() => setLoading(false))
            }));
        } else {
            alert('No se ha podido acceder a la ubicación')
        }
    }, [])

    return (
        <main className='text-white p-10 flex flex-col items-center gap-5'>
            <article className='p-5 rounded-sm w-2/5 bg-cyan-700/90 flex flex-col items-center gap-5'>
                <h1 className='text-4xl'>Condiciones actuales</h1>
                <div className='p-5 bg-cyan-800 border border-white rounded-sm w-full'>
                    <CurrentInfo loading={loading} data={data} />
                </div>
            </article>
        </main>
    )
}
