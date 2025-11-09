import { useEffect, useState } from "react";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface UserDetailsProps {
    userId: number
}

type EditableUserFields = "name" | "username" | "email" | "phone" | "website"; 
type EditableUserAddressFields = "street" | "suite" | "city" | "zipcode"
type EditableUserCompanyFields = "name" | "catchPhrase" | "bs"
type EditableUserGeoFields = "lat" | "lng";

const UserDetails = ({ userId }: UserDetailsProps) => {

    const [userDetails, setUserDetails] = useState<User | null>(null)
    const [editUserDetails, setEditUserDetails] = useState<User | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        console.log("UserDetails mounted with id:", userId);
        getUserDetails(userId)
    }, [userId]);

    const getUserDetails = async (userId: number) => {
        setLoading(true)
        const stored = localStorage.getItem("user_details") //check if data is there in localstorage

        if (stored) {
            try {
                const savedUser: User = JSON.parse(stored)
                setUserDetails(savedUser)
                setEditUserDetails(savedUser)
                setLoading(false)
            } catch (err) {
                console.warn("Failed to load localStorage user", err)
            }
        }

        try {
            const results = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`) 
            const data = await results.json()
            setUserDetails(data)
            setEditUserDetails(data)
            localStorage.setItem("user_details", JSON.stringify(data))
        } catch (err) {
            setError("Error Ocuured while displaying the user details")
        } finally {
            setLoading(false)
        }
    }

    const handleUserChange = (field: EditableUserFields, value: string) => {
        if (!editUserDetails) return;
        setEditUserDetails({ ...editUserDetails, [field]: value })
    }
    const handleAddressChange = (field: EditableUserAddressFields, value: string) => {
        if (!editUserDetails) return;
        setEditUserDetails({
            ...editUserDetails,
            address: {
                ...editUserDetails.address,
                [field]: value
            }
        })
    }

    const handleCompanyChange = (field: EditableUserCompanyFields, value: string) => {
        if (!editUserDetails) return;
        setEditUserDetails({
            ...editUserDetails,
            company: {
                ...editUserDetails.company,
                [field]: value
            }
        })
    }

    const handleGeoChange = (field: EditableUserGeoFields, value: string) => {
        if (!editUserDetails) return;
        setEditUserDetails({
            ...editUserDetails,
            address: {
                ...editUserDetails.address,
                geo: {
                    ...editUserDetails.address.geo,
                    [field]: value
                }
            }
        })
    }


    //Save the changes
    const handleSave = () => {
        if (!editUserDetails) return;
        setUserDetails(editUserDetails) // Implement the new changes to the previous user details
        localStorage.setItem("user_details", JSON.stringify(editUserDetails)) //save in localstorage
        setIsEdit(false)
    }


    if (!userDetails) {
        return <div>No User Found</div>
    } if (error) {
        return <div>{error}</div>
    } if (loading) {
        return <div>Loading User Details..</div>
    } if (!editUserDetails) return <div>Loading...</div>;

    // console.log("userDetails---", userDetails)
    return (
        <>
            <h1>USER DETAILS</h1>
            <p><label>ID:</label> {userDetails.id}</p>
            {(["name", "username", "email", "phone", "website"] as EditableUserFields[]).map((field) => (
                <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)} : </label>
                    {isEdit ? (
                        <input
                            value={(editUserDetails)[field]}
                            onChange={(e) => handleUserChange(field, e.target.value)}
                        />
                    ) : (
                        <span>{(editUserDetails)[field]}</span>
                    )}
                </div>
            ))}

            <h3>Address</h3>
            {(["street", "suite", "city", "zipcode"] as EditableUserAddressFields[]).map((field) => (
                <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)} : </label>
                    {isEdit ? (
                        <input
                            value={(editUserDetails.address)[field]}
                            onChange={(e) => handleAddressChange(field, e.target.value)}
                        />
                    ) : (
                        <span>{(editUserDetails.address)[field]}</span>
                    )}
                </div>
            ))}

            <h3>Geo</h3>
            {(["lat", "lng"] as EditableUserGeoFields[]).map((field) => (
                <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)} : </label>
                    {isEdit ? (
                        <input
                            value={(editUserDetails.address.geo)[field]}
                            onChange={(e) => handleGeoChange(field, e.target.value)}
                        />
                    ) : (
                        <span>{(editUserDetails.address.geo)[field]}</span>
                    )}
                </div>
            ))}

            <h3>Company</h3>
            {(["name", "catchPhrase", "bs"] as EditableUserCompanyFields[]).map((field) => (
                <div key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)} : </label>
                    {isEdit ? (
                        <input
                            value={(editUserDetails.company)[field]}
                            onChange={(e) => handleCompanyChange(field, e.target.value)}
                        />
                    ) : (
                        <span>{(editUserDetails.company)[field]}</span>
                    )}
                </div>
            ))}


            {/*Action Buttons */}
            <div>
                {
                    isEdit ?
                        (<><button onClick={handleSave}>Save</button> | <button onClick={() => setIsEdit(false)}>Cancel</button></>) :
                        <button onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </>
    )

}

export default UserDetails;