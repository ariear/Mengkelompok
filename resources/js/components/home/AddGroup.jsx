import axios from "axios";
import React, { useState } from "react";

function AddGroup({ getGroup }) {
    const [isOpen, setIsOpen] = useState(false)
    const [forms, setForms] = useState({
        thumb: '',
        group_name: ''
    })
    const [error, setError] = useState('')

    const onAddGroupHandler = async (e) => {
        e.preventDefault()

        setError('')

        const data = new FormData()
        data.append('thumb', forms.thumb)
        data.append('group_name', forms.group_name)

        try {
            await axios.post('/api/group', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            getGroup()
            setIsOpen(false)
        } catch (error) {
            setError(error.response.data.thumb[0])
        }
    }

    return (
        <div>
<button onClick={() => setIsOpen(!isOpen)} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Buat Kelompok Baru
</button>

<div id="defaultModal" class={`fixed top-0 left-0 right-0 bottom-0 m-auto w-max h-max ${ isOpen ? '' : 'hidden' }`}>
    <div class="relative w-full h-full max-w-2xl md:h-auto shadow-xl">
        <form onSubmit={onAddGroupHandler} encType="multipart/form-data" class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[600px]">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Buat Kelompokmu Sendiri
                </h3>
                <button type="button" onClick={() => setIsOpen(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-6 space-y-6">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Thumbnail Group</label>
                    <input name="thumb" onChange={(e) => setForms({...forms, thumb: e.target.files[0]})} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" required />
                    {error && <p className="text-red-500 text-sm">{error}</p> }
                </div>
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Group</label>
                    <input value={forms.group_name} onChange={(e) => setForms({...forms, group_name: e.target.value})} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis nama groupmu disini" required />
                </div>
            </div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buat</button>
                <button type="button" onClick={() => setIsOpen(false)} class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Batal</button>
            </div>
        </form>
    </div>
</div>

        </div>
    )
}

export default AddGroup
