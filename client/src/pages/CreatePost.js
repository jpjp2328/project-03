import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import Auth from '../utils/auth';
import Sidebar from '../components/Sidebar'


const CreatePost = () => {

    const [values, setValues] = useState({
        text: '',
        image: {
            url: 'https://via.placeholder.com/200x200.png?text=Post',
            public_id: '123'
        }
    });
    const [loading, setLoading] = useState(false);

    const { text, image } = values;

    const handleFormSubmit = () => {
        //
    }

    const handleFormChange = (event) => {
        event.preventDefault()
        setValues({ ...values, [event.target.name]: event.target.value })
    };

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
                                setLoading(false);
                                console.log(response);
                                // setValues to parent component
                                setValues({ ...values, image: response.data })
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
                setLoading(false);
                setValues({ ...values, image: { url: '', public_id: '' }})
            }).catch(error => {
                setLoading(false)
                console.log(error)
            })
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
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            {image && <img src={image.url} key={image.public_id} alt={image.public_id} style={{ height: '100px' }} className='float-right' onClick={() => handleRemoveImage(image.public_id)} />}
                                        </div>
                                        <div className='col-md-9'>
                                            <form onSubmit={handleFormSubmit}>
                                                <div className='form-group'>
                                                    <textarea
                                                        value={text}
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
                                                <button className='btn btn-primary' type='submit' disabled={!text}>Post</button>
                                            </form>
                                        </div>
                                    </div>
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
