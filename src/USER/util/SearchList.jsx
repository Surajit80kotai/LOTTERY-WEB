import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SearchList = ({ item, setSearch }) => {
    const [round, setRound] = useState(0)

    // ticket rounds calculation function
    const calculateRounds = () => {
        var currentDate = new Date().toISOString().slice(0, 10);
        let result = item?.rounds?.filter(item => item._time >= currentDate ? item : null)
        setRound(item?.rounds?.indexOf(result[0]))
    }

    useEffect(() => {
        calculateRounds()
    }, [item])


    return (
        <>
            <li key={item?._id} className='ser_list fs-4'>
                <Link to={`/info/${item?._id}/${round}`} className='text-dark' onClick={() => setSearch([])}><p>{item?.ticket_name}</p></Link>
            </li>
        </>
    )
}

export default SearchList