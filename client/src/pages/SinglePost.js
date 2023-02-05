import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { GET_SINGLE_POST } from '../utils/queries';
import PostCard from '../components/PostCard';

const SinglePost = () => {
    let params = useParams();

    const { loading, data } = useQuery(GET_SINGLE_POST, {
        variables: { postId: params.postId }
    });

    if (loading) return <p> Loading... </p>;

    return (
        <div className='container p-5'>
            <div className='p-5'>
                <PostCard post={data.singlePost} />
            </div>
        </div>
    )
};

export default SinglePost;