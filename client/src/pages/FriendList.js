import React from 'react';
import { useQuery } from '@apollo/client'

import { GET_ALL_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import UserCard from '../components/UserCard';
import Sidebar from '../components/Sidebar';

const FriendList = () => {
    const { data, loading } = useQuery(GET_ALL_USERS);

    if (loading) return <p>Loading...</p>

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <div className='container-fluid pt-5'>
                        <div className='row'>
                            <div className='col-md-2'>
                                {<Sidebar />}
                            </div>
                            <div className='col-md-10'>
                                <div className='container py-5'>
                                    <h4>FriendsList</h4>
                                </div>
                                <div className='container'>
                                    <h4> Look for Friends</h4>
                                    <div className='row p-5'>
                                        {data.allUsers.map(user => (
                                            <div className='col-md-3 p-2' key={user._id}>
                                                <UserCard user={user}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default FriendList
