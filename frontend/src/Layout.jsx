// Layout.js
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

function Layout(props) {
    const location = useLocation();
    const isLoginRoute = location.pathname === '/login';

    return props.isAuthenticated ?
        <>
            <Header/>
            <Outlet />
        </>
        :
        <Navigate replace to="/login"/>
}

export default Layout;
