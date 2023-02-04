import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import Auth from '../utils/auth';
import { GET_PROFILE } from '../utils/queries'
import { UPDATE_USER } from '../utils/mutations';
import Sidebar from '../components/Sidebar';


const MyProfile = () => {
    const [profileFormData, setProfileFormData] = useState({
        username: '',
        name: '',
        about: '',
        profilePicture: []
    });

    const [loading, setLoading] = useState(false);

    const { data } = useQuery(GET_PROFILE);

    useEffect(() => {
        if (data) {
            console.log(data.profile);
            setProfileFormData({
                username: data.profile.username,
                name: data.profile.name,
                about: data.profile.about,
                profilePicture: data.profile.profilePicture
            });
        }
    }, [data])

    const [updateUser] = useMutation(UPDATE_USER, {
        update: ({ data }) => {
            console.log('UPDATE USER MUTATION', data);
        }
    });

    const { username, name, about, profilePicture } = profileFormData;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        //console.log(profileFormData);
        setLoading(true)
        updateUser({ variables: { input: { ...profileFormData } } })
        setLoading(false)

    };

    const handleInputChange = (event) => {
        setProfileFormData({ ...profileFormData, [event.target.name]: event.target.value })
    };

    // Resizer npm to resize and returns uri
    const handleImageChange = async (event) => {
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    300,
                    300,
                    "JPEG, PNG",
                    100,
                    0,
                    (uri) => {
                        //console.log(uri);
                        axios.post('http://localhost:3001/uploadimages', { image: uri })
                            .then(response => {
                                setLoading(false)
                                console.log(response)
                                setProfileFormData({ ...profileFormData, profilePicture: [...profilePicture, response.data] })
                            })
                    },
                    "base64",
                    200,
                    200
                )
            } catch (err) {
                console.log(err);
            }
        };
    };

    const handleRemoveImage = (id) => {
        setLoading(true)
        axios.post('http://localhost:3001/uploadimages', { public_id: id })
            .then(response => {
                setLoading(false)
                let updatedImages = profilePicture.filter(item => {
                    return item.public_id !== id
                })
                setProfileFormData({ ...profileFormData, profilePicture: updatedImages })
            }).catch(error => {
                setLoading(false)
                console.log(error)
            })
    }

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
                                <div className='container'>
                                    <p>My Profile:</p>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <p> My images: </p>
                                        </div>
                                        <div className='col-md-9'>
                                            {profilePicture.map((image) => (<img src={image.url} key={image.public_id} alt={image.public_id} style={{ height: '100px' }} className='float-right' onClick={() => handleRemoveImage(image.public_id)} />))}
                                        </div>
                                    </div>
                                    <form onSubmit={handleFormSubmit} className='py-3'>
                                        <div className='form-group'>
                                            <label>Username</label>
                                            <input
                                                type='text'
                                                name='username'
                                                value={username || ''}
                                                onChange={handleInputChange}
                                                className='form-control'
                                                placeholder='Username'
                                                disabled={loading} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Name</label>
                                            <input type='text'
                                                name='name'
                                                value={name || ''}
                                                onChange={handleInputChange}
                                                className='form-control'
                                                placeholder='name'
                                                disabled={loading} />
                                        </div>
                                        <div className='form-group'>
                                            <label>About</label>
                                            <textarea type='text'
                                                name='about'
                                                value={about || ''}
                                                onChange={handleInputChange}
                                                className='form-control'
                                                placeholder='about'
                                                disabled={loading} />
                                        </div>
                                        <div className='form-group'>
                                            <label>Upload Image</label>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                onChange={handleImageChange}
                                                className='form-control'
                                                placeholder='profile-picture'
                                                disabled={loading} />
                                        </div>

                                        <button className="btn btn-primary" type="submit" disabled={loading}>
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
