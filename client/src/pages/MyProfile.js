import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'

import Auth from '../utils/auth';
import { GET_PROFILE } from '../utils/queries'


const MyProfile = () => {
    const [profileFormData, setProfileFormData] = useState({
        username: '',
        name: '',
        about: '',
        images: []
    })

    const [loading] = useState(false)

    const { data } = useQuery(GET_PROFILE)

    useEffect(() => {
        if (data) {
            console.log(data.profile)
            setProfileFormData({
                username: data.profile.username,
                name: data.profile.name,
                about: data.profile.about,
                images: data.profile.images
            })
        }
    }, [data])


    const handleFormSubmit = async (event) => {

    };

    const handleInputChange = (event) => {

    };

    const handleImageChange = async (event) => {

    };

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
                                    My Profile:
                                    <form onSubmit={handleFormSubmit} className='py-3'>
                                        <div className='form-group'>
                                            <label>Username</label>
                                            <input
                                                type='text'
                                                name='username'
                                                value={profileFormData.username}
                                                onChange={handleInputChange}
                                                className='form-control'
                                                placeholder='Username'
                                                disabled={loading} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Name</label>
                                            <input type='text'
                                                name='name'
                                                value={profileFormData.name}
                                                onChange={handleInputChange}
                                                className='form-control'
                                                placeholder='name'
                                                disabled={loading} />
                                        </div>
                                        <div className='form-group'>
                                            <label>About</label>
                                            <textarea type='text'
                                                name='about'
                                                value={profileFormData.about}
                                                onChange={handleInputChange}
                                                className='form-control'
                                                placeholder='Username'
                                                disabled={loading} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Image</label>
                                            <input
                                                type='file' 
                                                name='image' 
                                                onChange={handleImageChange} 
                                                className='form-control' 
                                                placeholder='Username' 
                                                disabled={loading} />
                                        </div>

                                        <button className="btn btn-primary" type="submit" disabled={ loading }>
                                            Submit
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        Login/ Signup to view Profile!
                    </div>
                </>
            )}
        </div>
    );
};

export default MyProfile
