import React, { useState } from 'react'
import { getCities } from '../fetching';
import { IoSearchOutline } from "react-icons/io5";
import uuid from 'react-uuid';
let timeOut;

export const SearchBar = ({ fetchData }) => {

    const [value, setValue] = useState('');
    const [results, setResults] = useState(null);

    const onChange = (e) => {
        const v = e.target.value;
        setValue(v)
        if (timeOut)
            clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            getCities(v)
                .then(info => { console.log(info); setResults(info) })
                .catch(err => setResults(null))
        }, [300])

    }

    return (
        <div className='relative rounded-[25px] w-[478px] h-[52px] bg-white flex items-center gap-2 px-[25px]'>
            <input type="text" value={value} onChange={onChange} className='h-full w-full bg-transparent focus:outline-none' />
            <button onClick={() => fetchData(encodeURI(value))} className='hover:bg-slate-300 p-2 rounded'><IoSearchOutline size={24} cursor={'pointer'} /></button>
            {results && <div className='absolute top-[105%] left-0 w-full p-1 rounded-sm bg-white'>
                {results.map((
                    item => <h1
                        onClick={() => {
                            setResults(null); setValue(`${item.name + ', '} ${item.state ? item.state + ', ' : ''} ${item.country}`)
                        }}
                        key={uuid()}
                        className='bg-white p-1 hover:bg-slate-200 cursor-pointer'>
                        {item.name}, <small>{item.state ? item.state + ',' : ''} {item.country}</small></h1>
                ))}
            </div>}
        </div>
    )
}
