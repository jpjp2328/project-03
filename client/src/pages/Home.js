import React from 'react';
import { useQuery } from '@apollo/client'


// importing queries
import { GET_ALL_POSTS } from '../utils/queries';

function Home() {
    const { data, loading } = useQuery(GET_ALL_POSTS)

    if (loading) return <p>Loading...</p>

    return (
        <div className='container'>
            <div className='row p-5'>
                {data.allPosts.map(post => (
                    <div className='col-md-4' key={post.id}>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'>
                                    <h4>{post.title}</h4>
                                </div>
                                <p className='card-text'>{post.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
