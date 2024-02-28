import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'


export const NavBar = () => {

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <nav className='px-10 py-2 bg-cyan-950 text-white flex items-center justify-between mt-10 text-xl'>
            <div className='grid grid-cols-3 gap-5 justify-items-center'>
                <h1>Gabriel Enguídanos</h1>
                <h1>2ºDAW</h1>
                <h1>2024</h1>
            </div>
            {!isAuthenticated ? <Button login={true} handle={() => loginWithRedirect()}>Login</Button> : <Button handle={() => logout()}>Logout</Button>}

        </nav>
    )
}

function Button({ children, login = false, handle }) {
    return <button onClick={()=>handle()} className={(login ? 'bg-emerald-500 ' : 'bg-orange-500 ') + 'px-5 py-1 rounded-[25px]'}>{children}</button>
}
