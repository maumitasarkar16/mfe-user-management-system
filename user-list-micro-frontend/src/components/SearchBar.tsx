import React from "react"

interface SearchBarProps {
    searchQuery : string,
    onSearch : (value : string) => void
}

const SearchBar : React.FC<SearchBarProps> = React.memo(({searchQuery, onSearch}) => {
    return(
        <div>
            <span>Search by Name or Username: </span>  
            <span><input type="text" value={searchQuery} onChange={(e) => onSearch(e.target.value)} /></span>
          </div>
    )
})

export default SearchBar