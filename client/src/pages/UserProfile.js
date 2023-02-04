import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_USER } from '../utils/queries';

const UserProfile = () => {
    const {loading, data} = useQuery(GET_SINGLE_USER, {
        variables: {username: 'jpnewuser2'}
    })

    if(loading) return <p> Loading... </p>;

    return (
        <div className='container'>
            {JSON.stringify(data)}
        </div>
    )
}

export default UserProfile