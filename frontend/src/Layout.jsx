// Layout.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

function Layout({isAuthenticated, isUserAuthenticated}) {

    return isAuthenticated ?
        <>
            <Header  isUserAuthenticated={isUserAuthenticated}/>
            <Outlet />
        </>
        :
        <Navigate replace to="/login"/>
}

export default Layout;
