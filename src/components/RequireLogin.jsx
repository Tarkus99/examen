import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export const RequireLogin = ({ isAllowed, children, redirectTo }) => {

    if (!isAllowed)
        return <Navigate to={redirectTo} />

    return children;
}
