import React, { useEffect, useState } from 'react'

const SearchDesk = ({ ticketList, search }) => {

    const [newList, setNewList] = useState([])
    const onSearch = () => {
        if (search.length > 0) {
            const data = ticketList.filter(item => {
                if (item.ticket_name.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            });
            setNewList(data);
        }
    }

    console.log(newList);

    useEffect(() => {
        onSearch()
    }, [search])

    return (
        <>

        </>
    )
}

export default SearchDesk