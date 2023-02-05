import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {

    const [getSinglePost] = useQuery(GET_SINGLE_POST)

    return (
        <div className='container'>
            <div className='row p-5'>
                Post
            </div>
        </div>
    )
};

export default SinglePost;