import axios from "axios"
import { useState } from "react"
import ModalSearchGroup from "./ModalSearchGroup"

function SearchGroup({ getGroup }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')
    const [group, setGroup] = useState(null)
    const [isJoin, setIsJoin] = useState(null)

    const onSearchSubmit = async (e) => {
        e.preventDefault()

        setIsJoin(null)
        setGroup(null)
        setIsOpen(true)
        setIsLoading(false)

        try {
            setIsLoading(true)
            const fetch = await axios.post('/api/group/search', {code}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setGroup(fetch.data.data)
            setIsJoin(fetch.data.isJoin)
        } catch (error) {
            console.log(error.response.data.message);
        }
        setIsLoading(false)
    }

    const onJoinHandler = async () => {
        try {
            await axios.post(`/api/group/${code}/join`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            getGroup()
            setIsOpen(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className="mt-10">
        <p className="font-medium mb-1">Masuk Kelompok Dengan Kode</p>
        <form onSubmit={onSearchSubmit} class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Masukkan disini" required />
            </div>
            <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="sr-only">Search</span>
            </button>
        </form>
        <p className="text-sm text-gray-500">Minta kode kelompok kepada pembuat kelompok</p>
        <ModalSearchGroup isOpen={isOpen} setIsOpen={setIsOpen} group={group} isLoading={isLoading} isJoin={isJoin} onJoinHandler={onJoinHandler} />
        </div>
    )
}

export default SearchGroup
