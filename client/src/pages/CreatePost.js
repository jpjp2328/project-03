import React from 'react';
import { Link } from 'react-router-dom';


import Auth from '../utils/auth';

const MyProfile = () => {
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
                                            <Link className='nav-link' to='post/create'>
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
                                Here to create Post!
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

export default MyProfile
