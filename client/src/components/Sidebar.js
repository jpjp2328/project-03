import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className='side-nav'>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link className='nav-link text-dark' to='/profile'>
                        <h5>Edit My Profile</h5>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link text-dark' to='/post/create'>
                        <h5>My Posts</h5>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link text-dark' to='/user/friends'>
                        <h5>Friends</h5>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar