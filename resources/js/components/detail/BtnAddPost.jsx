import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"

function BtnAddPost({ code, getPosts }) {
    const webRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [forms, setForms] = useState({
        title: '',
        img: '',
        desc: ''
    })

    const onAddPostHandler = async (e) => {
        e.preventDefault()

        setForms({
            title: '',
            img: '',
            desc: ''
        })

        try {
            const fetch = await axios.post(`/api/post/${code}`, {
                title: forms.title,
                desc: forms.desc,
                img: webRef.current.getScreenshot()
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            getPosts()
            setIsOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <img src="/img/add.png" className="w-[70px] fixed bottom-6 right-10 cursor-pointer" onClick={() => setIsOpen(!isOpen)} alt="" />
            <div class={`fixed top-0 left-0 right-0 bottom-0 w-max h-max m-auto ${isOpen ? '' : 'hidden'}`}>
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <form onSubmit={onAddPostHandler} class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[600px]">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Buat Postingan Baru
                </h3>
                <button type="button" onClick={() => setIsOpen(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-6 space-y-6">
                <Webcam ref={webRef} />
                <div>
                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
                <input type="text" value={forms.title} onChange={(e) => setForms({...forms, title: e.target.value})} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis judul disini" required />
                </div>
                <div>
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
<textarea id="message" rows="4" value={forms.desc} onChange={(e) => setForms({...forms, desc: e.target.value})} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis deskripsi disini"></textarea>
                </div>
            </div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Posting</button>
                <button data-modal-hide="defaultModal" onClick={() => setIsOpen(false)} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Batal</button>
            </div>
        </form>
    </div>
</div>
        </div>
    )
}

export default BtnAddPost
