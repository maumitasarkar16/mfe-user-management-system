import { Link } from "react-router-dom"
import Router from "../Router"
import Communication from "../Communication"

const Shell = () => {
    return (
        <>
            <nav>
                <Link to="/"> Home </Link>  |  <Link to="/users"> User List </Link>
            </nav>
            <Communication />
            <Router />  
        </>
    )
}

export default Shell