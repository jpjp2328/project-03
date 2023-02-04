import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'

import { GET_ALL_USERS } from '../utils/queries';
import Auth from '../utils/auth';

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
                                <nav>
                                    <ul className='nav flex-column'>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/profile'>
                                                Profile
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/post/create'>
                                                Post
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/user/friends'>
                                                Friends
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className='col-md-10'>
                                <div className='container'>
                                    <div className='row p-5'>
                                        {data.allUsers.map(user => (
                                            <div className='col-md-4' key={user._id}>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <div className='card-title'>
                                                            <h4>{user.username}</h4>
                                                        </div>
                                                        <p className='card-text'>{user.about}</p>
                                                    </div>
                                                </div>
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
