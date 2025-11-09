import React from "react"
import { Input } from "antd";

interface SearchBarProps {
    searchQuery : string,
    onSearch : (value : string) => void
}

const SearchBar : React.FC<SearchBarProps> = React.memo(({searchQuery, onSearch}) => {
    return(
        <div className="ant-table-wrapper">
            <span>Search by Name or Username : </span>  
            <span><Input style={{ width: 700 }} value={searchQuery} onChange={(e) => onSearch(e.target.value)} /></span>
          </div>
    )
})

export default SearchBar