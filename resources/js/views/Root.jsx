import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"

function Root() {
    return (
        <div className="container xl:w-[1200px] mx-auto">
            <Nav />
            <Outlet />
        </div>
    )
}

export default Root
