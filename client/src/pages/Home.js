import React from 'react';
import { useQuery } from '@apollo/client'


// importing queries
import { GET_ALL_POSTS } from '../utils/queries';
import PostCard from '../components/PostCard';

function Home() {
    const { data, loading } = useQuery(GET_ALL_POSTS)
    console.log(data)
    if (loading) return <p>Loading...</p>

    return (
        <div className='container'>
            <div className='row p-5'>
                {data.allPosts.map(post => (
                    <div className='col-md-4 p-2' key={post._id}>
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
