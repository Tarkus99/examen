import React, { useEffect, useState } from 'react'
import { getCurrentFromCoordinates } from '../fetching';
import { CurrentInfo } from '../components/CurrentInfo';
import { useAuth0 } from '@auth0/auth0-react';


export const LandingPage = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(useAuth0().user);

    useEffect(() => {
        if (navigator.geolocation) {
            (navigator.geolocation.getCurrentPosition((position) => {
                getCurrentFromCoordinates(position.coords.latitude, position.coords.longitude)
                    .then(info => { console.log(info); setData(info) })
                    .catch(err => { console.log(err); alert('Se ha producido un error') })
                    .finally(() => setLoading(false))
            }));
        } else {
            alert('No se ha podido acceder a la ubicación')
        }
    }, [])



    return (
        <main className='text-white p-10 flex flex-col items-center gap-5'>
            <h1 className='text-6xl text-center'>Landing page</h1>
            <article className='p-5 border rounded-sm w-2/5 bg-cyan-700 flex flex-col items-center gap-5'>
                <h1 className='text-4xl'>Condiciones actuales</h1>
                <div className='p-5 bg-cyan-800 border border-white rounded-sm w-full'>
                    <CurrentInfo loading={loading} data={data} />
                </div>
            </article>
        </main>
    )
}
