import './bootstrap';
import 'flowbite';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './views/Home';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Root from './views/Root';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
]);

if (document.getElementById('app')) {
    ReactDOM.render(<RouterProvider router={router} />, document.getElementById('app'))
}
