import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SearchDesk = ({ ticketList, search, setSearch }) => {

    const [newList, setNewList] = useState([])
    const onSearch = () => {
        if (search.length > 0) {
            const data = ticketList.filter(item => (item.ticket_name.toLowerCase().includes(search.toLowerCase())) ? item : null)
            setNewList(data);
        }
    }

    useEffect(() => {
        onSearch()
    }, [search])

    return (
        <>
            <ul>
                {
                    newList?.map((item) => {
                        return (
                            <li key={item?._id} className='ser_list fs-4'>
                                <Link to={`/info/${item?._id}`} className='text-dark' onClick={() => setSearch([])}><p>{item?.ticket_name}</p></Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default SearchDesk