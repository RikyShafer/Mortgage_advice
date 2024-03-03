import React from 'react'
import {MdSearch} from "react-icons/md"
import "./search.css"
import { useSearchParams } from 'react-router-dom'
const Search = ({placeholder}) => {
  const [searchParams, setSearchParams]=useSearchParams()
  const q= searchParams.get("q")
  return (
    <div className='search-container'>
       <MdSearch/> 
        <input type='text'
        defaultValue={q||""}
        placeholder={placeholder}
        onChange={(e) => setSearchParams({q:e.target.value})}
        className='search-input'/>
    </div>
  )
}

export default Search