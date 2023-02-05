import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className='side-nav'>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link className='nav-link text-dark' to='/profile'>
                        Edit My Profile
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link text-dark' to='/post/create'>
                        My Posts
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link text-dark' to='/user/friends'>
                        Friends
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar