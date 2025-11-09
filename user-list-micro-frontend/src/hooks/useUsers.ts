import { useEffect, useState } from "react";
import type { User } from "../interface/User";

const USER_LIST_API = import.meta.env.VITE_USER_LIST_API

export const useUsers = () => {

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>("")

    // Get User List from API
    useEffect(() => {
        getuserLists()
    }, [])

    const getuserLists = async () => {
        try {
            const results = await fetch(USER_LIST_API);
            const data = await results.json();
            setUsers(data)
        } catch(err) {
            setError("Error Occured while fetching the User List")
        } finally {
            setLoading(false)
        }
    }

    return {users, loading, error}

}