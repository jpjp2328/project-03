import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import Auth from '../utils/auth';
import Sidebar from '../components/Sidebar'
import { CREATE_POST, DELETE_POST } from '../utils/mutations';
import { GET_POST_BY_USER } from '../utils/queries';
import PostCard from '../components/PostCard';


const CreatePost = () => {
    const [values, setValues] = useState({
        text: '',
        image: {
            url: 'https://www.shareicon.net/data/256x256/2017/07/13/888370_business_512x512.png',
            public_id: '123'
        }
    });
    const [loading, setLoading] = useState(false);

    const { data: posts } = useQuery(GET_POST_BY_USER);

    const { text, image } = values;

    const [createPost] = useMutation(CREATE_POST);

    const [deletePost] = useMutation(DELETE_POST);

    const handleDelete = async postId => {
        setLoading(true);
        deletePost({
            variables: { postId },
            refetchQueries: [{ query: GET_POST_BY_USER }]
        })
        setLoading(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setLoading(true);
        createPost({
            variables: { input: values },
            refetchQueries: [{ query: GET_POST_BY_USER }]
        });
        setValues({
            text: '',
            image: {
                url: 'https://www.shareicon.net/data/256x256/2017/07/13/888370_business_512x512.png',
                public_id: '123'
            }
        });
        setLoading(false);
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
                    400,
                    400,
                    "JPEG, PNG",
                    100,
                    0,
                    (uri) => {
                        console.log(uri);
                        axios.post('http://localhost:3001/uploadimages', { image: uri })
                            .then(response => {
                                setLoading(false);
                                console.log(response);
                                // setValues to parent component
                                setValues({ ...values, image: response.data })
                            })
                    },
                    "base64",
                    300,
                    300
                )
            } catch (err) {
                console.log(err);
            }
        };
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
                                    <div className='card p-4 create-card'>
                                        {loading ? <p>Loading...</p> : <h4>Create Post</h4>}
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                {image && <img src={image.url} key={image.public_id} alt={image.public_id} style={{ height: '100px' }} className='float-right my-2' />}
                                                <div className='py-3'>
                                                    <div className='form-group'>
                                                        <label>Selected Image:</label>
                                                        <input
                                                            type='file'
                                                            accept='image/*'
                                                            onChange={handleImageChange}
                                                            className='form-control'
                                                            placeholder='profile-picture'
                                                            disabled={loading} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-8'>

                                                <form onSubmit={handleFormSubmit}>
                                                    <div className='form-group py-4'>
                                                        <textarea
                                                            value={text}
                                                            onChange={handleFormChange}
                                                            name="text"
                                                            row='10'
                                                            className='md-textarea form-control'
                                                            placeholder="Looking to Buy/Sell? or simply post your thoughts..."
                                                            maxLength={300}
                                                            disabled={loading}
                                                        >
                                                        </textarea>
                                                    </div>
                                                    <button className='btn btn-primary float-right' type='submit' disabled={!text}>Post</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card p-5 my-5 myposts'>
                                        <h4 className='text-center p-2'>My Posts</h4>
                                        <div className='row p-3'>
                                            {posts &&
                                                posts.postByUser.map(post => (
                                                    <div className='col-md-4 p-2' key={post._id}>
                                                        <PostCard post={post} handleDelete={handleDelete} showDeleteButton={true} />
                                                    </div>
                                                ))}
                                        </div>
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

export default CreatePost
