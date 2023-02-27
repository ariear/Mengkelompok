import './bootstrap';
import 'flowbite';

import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import LocaleContext from './context/LocaleContext';
import Nav from './components/Nav';
import axios from 'axios';

const App = () => {
    const [authUser, setAuthUser] = useState(null)
    const [initializing,setInitializing] = useState(true)

    const getUserLoged = async () => {
        if (localStorage.getItem('token')) {
            const fetch = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (fetch.status === 200) {
                setAuthUser(fetch.data)
            }
        }
        setInitializing(false)
    }

    const onLogoutHandler = async () => {
        setAuthUser(null)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        getUserLoged()
    },[])

    const localeContextValue = useMemo(() => {
        return {
            authUser
        }
    },[authUser])

    if (initializing) {
        return null
    }

    if (authUser === null) {
        return (
            <div className='container xl:w-[1200px] mx-auto'>
                <LocaleContext.Provider value={localeContextValue} >
                    <Nav onLogoutHandler={onLogoutHandler} />
                    <Routes>
                        <Route path='/*' element={<Login setAuthUser={setAuthUser} />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
                </LocaleContext.Provider>
            </div>
        )
    }

    return (
        <div className='container xl:w-[1200px] mx-auto'>
            <LocaleContext.Provider value={localeContextValue} >
                <Nav onLogoutHandler={onLogoutHandler} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </LocaleContext.Provider>
        </div>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))
}
