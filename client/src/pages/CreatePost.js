import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import Sidebar from '../components/Sidebar'


const CreatePost = () => {

    const [values, setValues] = useState({
        text: '',
        image: {
            url: 'https//via.placeholder.com/200x200.png?text=Post',
            public_id: '123'
        }
    });
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = () => {
        //
    }

    const handleFormChange = (event) => {
        event.preventDefault()
        setValues({ ...values, [event.target.name]: event.target.value })
    };

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
                                <div className='container p-5'>
                                    {loading ? <p>Loading...</p> : <h4>Create</h4>}
                                    <form onSubmit={handleFormSubmit}>
                                        <div className='form-group'>
                                            <textarea
                                                value={values.text}
                                                onChange={handleFormChange}
                                                name="text"
                                                row='10'
                                                className='md-textarea form-control'
                                                placeholder="What's on your mind"
                                                maxLength={200}
                                                disabled={loading}
                                            >
                                            </textarea>
                                        </div>
                                        <button className='btn btn-primary' type='submit' disabled={!values.text}>Post</button>
                                    </form>
                                    <hr />
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

export default CreatePost
