import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import SearchList from './SearchList';

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
    }, [search, ticketList])

    return (
        <>
            <ul>
                {
                    newList?.map((item, index) => {
                        return (
                            // <li key={item?._id} className='ser_list fs-4'>
                            //     <Link to={`/info/${item?._id}/${round}`} className='text-dark' onClick={() => setSearch([])}><p>{item?.ticket_name}</p></Link>
                            // </li>
                            <SearchList
                                item={item}
                                key={index}
                                setSearch={setSearch}
                            />
                        )
                    })
                }
            </ul>
        </>
    )
}

export default SearchDesk