import { useEffect, useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import  "./styles/User.scss"

const PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE)

const UserList = () => {

    const { users, error, loading } = useUsers()
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("") //search performance
    const [currentPage, setCurrentPage] = useState(1)

    //search performance optimization
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
            setCurrentPage(1)
        },500)

        return () => clearTimeout(timer)

    },[searchQuery])

    //Search performation optimization
    const filteredUsersAfterSearch = useMemo( () => {
        return debouncedSearchQuery.trim() ? 
        users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || user.username.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) 
        : users 
    }  , [debouncedSearchQuery, users])

    //Pagination
    const totalPages = Math.ceil(filteredUsersAfterSearch.length / PAGE_SIZE)
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE
    const paginatedUsers = filteredUsersAfterSearch.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    if (loading)
        return <p>Loading user list...</p>
    if (error)
        return <p>{error}</p>

    return (
        <>
        <h1>USER LIST</h1>
           <SearchBar searchQuery={searchQuery} onSearch={(value) => {setSearchQuery(value); setCurrentPage(1); }}/>
           <UserTable users={paginatedUsers} currentPage={currentPage} totalPages={totalPages} onPageChange={(value) => handlePageChange(value)} />   
        </>
    )
}

export default UserList;