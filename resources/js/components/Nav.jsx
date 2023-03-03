import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../context/LocaleContext";

function Nav({ onLogoutHandler }) {
    const { authUser } = useContext(LocaleContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav class="px-10 py-4 container xl:w-[1200px] mx-auto mt-6 mb-10 border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">

  <div class="container flex flex-wrap items-center justify-between mx-auto">
  <Link to='/' href="https://flowbite.com/" class="flex items-center">
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Mengke.</span>
  </Link>
  <div class="flex items-center md:order-2 relative">
    {
        authUser !== null &&
        <>
        <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" >
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" onClick={() => setIsOpen(!isOpen)} src={authUser.pp} alt="user photo" />
        </button>
        <ul class={`py-2 absolute bg-white z-10 -bottom-24 -left-10 shadow rounded-lg ${isOpen ? '' : 'hidden'}`}>
            <li>
                <Link to='/me' class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profil</Link>
            </li>
                    <li>
                        <a onClick={onLogoutHandler} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
                    </li>
            </ul>
        </>
    }
  </div>
  </div>

        </nav>
    )
}

export default Nav
