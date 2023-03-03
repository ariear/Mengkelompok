import axios from "axios";
import React, { useEffect, useState } from "react";
import AddGroup from "../components/home/AddGroup";
import SearchGroup from "../components/home/SearchGroup";

function Home() {
    const [groups, setGroups] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getGroup = async () => {
        setIsLoading(true)
        setGroups([])
        const fetch = await axios.get('/api/group', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setGroups(fetch.data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getGroup()
    },[])

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-400 to-green-400 text-white p-5 rounded-lg relative mt-16">
                <h1 className="text-2xl font-medium mb-3">Atur Pekerjaan Kelompokmu Disini !!</h1>
                <p>Dengan website mengkelompok kamu bisa mengatur tugas kelompokmu</p>
                <img src="/img/school.png" className="w-[220px] absolute -top-16 -right-16" alt="" />
            </div>
            <p className="mt-4 text-xl font-medium mb-5">Kelompok ku</p>
            {
                isLoading ?
                    <p>Loading...</p>
                        :
                    groups.length > 0 ?
                        <div className="flex items-center flex-wrap justify-center">
                            {
                            groups.map(group =>
                                <div key={group.id} className="flex bg-white w-[500px] rounded-lg overflow-hidden m-3">
                                    <img src={`/storage/${group.thumb}`} className="w-[250px]" alt="" />
                                    <div className="p-3">
                                    <p className="text-lg font-medium mb-2">{group.group_name}</p>
                                    <p className="text-sm border w-max py-2 px-5 rounded-full flex items-center"><label className="block rounded-full mr-2 w-2 border h-2 bg-blue-500"></label>{group.code}</p>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                            :
                        <p>Kamu belum bergabung di kelompok sama sekali njir!!</p>
            }
            <SearchGroup getGroup={getGroup} />
            <p className="text-center mt-3 relative w-max mx-auto text-gray-400 flex items-center">
                <div className="w-20 h-1 bg-gray-400 border"></div>
                <p className="mx-5">Atau</p>
                <div className="w-20 h-1 bg-gray-400 border"></div>
            </p>
            <div className="flex justify-center mt-5 mb-10">
            <AddGroup getGroup={getGroup} />
            </div>
        </div>
    )
}

export default Home
