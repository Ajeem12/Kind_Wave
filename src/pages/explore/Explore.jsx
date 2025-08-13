import React, { useState } from 'react'
import SearchBar from '../../components/searchbar/SearchBar'
import EventList from '../../components/event_card/EventList'

const Explore = () => {
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchResults = (results) => {
        setSearchResults(results);
        console.log("Received search results:", results);
    };
    return (
        <div >
            <SearchBar onSearchResults={handleSearchResults} />
            <EventList searchResults={searchResults} />

        </div>

    )
}

export default Explore