function ModalSearchGroup({ isOpen, setIsOpen, isLoading, group, isJoin, onJoinHandler }) {
    return (
        <div class={`fixed z-50 top-0 left-0 right-0 bottom-0 m-auto w-max h-max ${ isOpen ? '' : 'hidden' }`}>
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[500px]">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Hasil Pencarian Kelompok
                </h3>
                <button type="button" onClick={() => setIsOpen(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-6 space-y-6">
                {
                    isLoading ?
                        <p>Loading...</p>
                            :
                        group !== null ?
                        <div>
                            <img src={`/storage/${group.thumb}`} className="w-full rounded-lg mb-2" alt="" />
                            <p className="font-medium text-center">{group.group_name}</p>
                            <div className="flex justify-end mt-4">
                                {
                                    isJoin ?
                                    <button type="button" class="text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Sudah Bergabung</button>
                                    :
                                    <button type="button" onClick={onJoinHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Gabung</button>
                                }
                            </div>
                        </div>
                            :
                        <p>Njir gak ditemukan groupmu</p>
                }
            </div>
        </div>
    </div>
</div>
    )
}

export default ModalSearchGroup
