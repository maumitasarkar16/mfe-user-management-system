import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Communication = () => {

    const navigate = useNavigate();

    //event "userSelected" listening from user list mfe to redirect to user details
    useEffect(() => {
        const handleUserSelected = (event: CustomEvent) => {
            const userId  = event.detail;
            navigate(`/users/${userId }`);
        }
        window.addEventListener("userSelected", handleUserSelected as EventListener)
        return () => {
            window.removeEventListener("userSelected", handleUserSelected as EventListener)
        }
    }, [navigate])

    return null;
}
 export default Communication