import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SearchDesk = ({ ticketList, search, setSearch }) => {

    const [newList, setNewList] = useState([])
    const onSearch = () => {
        if (search.length > 0) {
            const data = ticketList.filter(item => {
                if (item.ticket_name.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
                return item
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
            <div className="search_list">
                <ul>
                    {
                        newList?.map((item) => {
                            return (
                                <li key={item?._id} className='fs-4'>
                                    <Link to={`/info/${item?._id}`} className='text-black' onClick={() => setSearch([])}><p>{item?.ticket_name}</p></Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default SearchDesk