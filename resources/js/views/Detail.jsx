import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BtnAddPost from "../components/detail/BtnAddPost"
import PostList from "../components/detail/PostList"
import NotFound from "./404"

function Detail() {
    const [group, setGroup] = useState(null)
    const [isNotFound, setIsNotFound] = useState(false)
    const [users, setUsers] = useState([])
    const { code } = useParams()
    const [loading,setLoading] = useState(false)

    const getGroupDetail = async () => {
        setLoading(true)
        try {
            const fetch = await axios.get(`/api/group/${code}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setGroup(fetch.data.data)
            setUsers(fetch.data.data.user)
            setLoading(false)
        } catch (error) {
            if (error.response.status === 404) {
                setIsNotFound(true)
            }
        }
    }

    useEffect(() => {
        getGroupDetail()
    },[])

    if (isNotFound) {
        return <NotFound />
    }

    return (
        <div>
            {
                loading ?
                    <p>Loading dulu gk sih</p>
                        :
                group !== null &&
                    <div className="bg-gradient-to-r from-orange-300 to-orange-800 text-white p-5 rounded-lg relative mt-16">
                        <p className="bg-orange-100 mb-2 w-max text-orange-300 px-3 py-1 rounded-full text-sm">#{group.code}</p>
                        <h1 className="text-xl font-medium mb-2">{group.group_name}</h1>
                        <p className="text-sm text-orange-100 flex items-center">{users[0].name}, {users[1].name} { users.length > 2 ? `dan ${users.length - 2} lainnya` : ''}</p>
                        <img src="/img/school.png" className="w-[220px] absolute -top-16 -right-16" alt="" />
                    </div>
            }
            <p className="my-3 text-lg font-medium text-gray-600">Postingan Terbaru</p>
            <BtnAddPost />
            <PostList />
        </div>
    )
}

export default Detail
