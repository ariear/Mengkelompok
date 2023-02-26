import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [forms, setForms] = useState({
        email: '',
        password: ''
    })
    const [isErrors, setIsErrors] = useState([])
    const [isNotFound, setIsNotFound] = useState(false)

    const Navigate = useNavigate()

    const onLoginHandler = async (e) => {
        e.preventDefault()
        setIsNotFound(false)
        setIsErrors([])

        try {
            const fetch = await axios.post('/api/login', forms)
            localStorage.setItem('token', fetch.data.token)
            Navigate('/')
        } catch (error) {
            setIsErrors(error.response.data)
            if (error.response.data.message) {
                setIsNotFound(true)
            }
        }
    }

    return (
        <div>
            <form onSubmit={(e) => onLoginHandler(e)}>
            {isNotFound &&
                <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div>
                  Wrong Email/Password
                </div>
              </div>}
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" value={forms.email} onChange={(e) => setForms({...forms, email: e.target.value})} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="anjai@pipis.id" required />
                {isErrors.email && <p className="text-sm text-red-600">{isErrors.email}</p>}
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" value={forms.password} onChange={(e) => setForms({...forms, password: e.target.value})} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {isErrors.password && <p className="text-sm text-red-600">{isErrors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            <p className="text-blue-600"><Link to='/register'>Dont Have account?</Link></p>
            </div>
            </form>
        </div>
    )
}

export default Login
