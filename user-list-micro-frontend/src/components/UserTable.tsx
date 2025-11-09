import React from "react";
import type { User } from "../interface/User";
import { Button, Card } from "antd";

interface UserTableProps {
    users: User[];
    currentPage : number;
    totalPages: number;
    onPageChange : (page : number) => void
}

const UserTable : React.FC<UserTableProps> = React.memo(({users, currentPage, totalPages, onPageChange}) => {

    const pageNum = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNum.push(i)
    }

    //Redirect to user Details micro frontend
    const handleUserDetails = (userId: number) => {
        window.dispatchEvent(new CustomEvent("userSelected", { detail: userId }))
    }

    return (
        <Card className="ant-card">
             <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map(item => {
                        return (
                            <tr key={item?.id} >
                                <td>{item?.id}</td>
                                <td>{item?.name}</td>
                                <td>{item?.username}</td>
                                <td>{item?.email}</td>
                                <td><Button type="primary" onClick={() => handleUserDetails(item?.id)}>User Details</Button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>


            {/* pagination controls */}

            <div>
                <Button type="primary" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</Button>

                {
                    pageNum.map((page) => {
                        return (
                            <Button type="primary" key={page} onClick={() => onPageChange(page)}>{page}</Button>
                        )
                    })
                }

                <Button type="primary" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </Card>
    )
})

export default UserTable