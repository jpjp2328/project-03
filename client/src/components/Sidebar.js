import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
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
    )
}

export default Sidebar