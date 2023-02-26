import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [forms, setForms] = useState({
        name: '',
        email: '',
        password: ''
    })
    const Navigate = useNavigate()

    const onRegisterHandler = async (e) => {
        e.preventDefault()

        try {
            const fetch = await axios.post('/api/register', forms)
            if (fetch.status === 201) {
                Navigate('/login')
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <form onSubmit={(e) => onRegisterHandler(e)} >
            <div class="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="text" value={forms.name} onChange={(e) => setForms({...forms, name: e.target.value})} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="anjai" required />
            </div>
            <div class="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" value={forms.email} onChange={(e) => setForms({...forms, email: e.target.value})} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="anjai@pipis.id" required />
            </div>
            <div class="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" value={forms.password} onChange={(e) => setForms({...forms, password: e.target.value})} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="flex items-center justify-between">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            <p className="text-blue-600"><Link to='/login'>Have account?</Link></p>
            </div>
            </form>
        </div>
    )
}

export default Register
