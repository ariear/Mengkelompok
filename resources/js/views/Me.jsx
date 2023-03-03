import React, { useContext } from "react"
import LocaleContext from "../context/LocaleContext"

function Me() {
    const { authUser } = useContext(LocaleContext)
    return (
        <div className="text-center">
            <div className="w-full h-[120px] relative rounded-lg bg-gradient-to-l from-blue-500 to-green-300 mb-12">
                <img src={authUser.pp} className="absolute w-[80px] rounded-full border-4 -bottom-10 left-0 right-0 mx-auto " alt="" />
            </div>
            <p className="text-lg font-medium">{authUser.name}</p>
            <p className="text-gray-400">#{authUser.code}</p>
        </div>
    )
}

export default Me
