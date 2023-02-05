import React, { useState } from 'react';
import { useQuery } from '@apollo/client'


// importing queries
import { GET_ALL_POSTS, GET_TOTAL_POSTS } from '../utils/queries';
import PostCard from '../components/PostCard';

function Home() {

    const [page, setPage] = useState(1);

    const { data, loading } = useQuery(GET_ALL_POSTS, {
        variables: { page: page }
    });

    const {data: postCount} = useQuery(GET_TOTAL_POSTS);

    const pagination = () => {
        const totalPages = Math.ceil(postCount && postCount.totalPosts / 6);
        // console.log(totalPages)
        let pages = [];
        for(let i = 1; i <= totalPages; i++) {
            pages.push(
                <li>
                    <button className='page-link' onClick={() => setPage(i)}>{i}</button>
                </li>
            );
        }
        return pages;
    };

    console.log(data)
    if (loading) return <p>Loading...</p>

    return (
        <div className='container'>
            <div className='row p-5'>
                {data &&
                    data.allPosts.map(post => (
                        <div className='col-md-4 p-2' key={post._id}>
                            <PostCard post={post} />
                        </div>
                    ))}
            </div>
            <nav>
                <ul className='pagination justify-content-center'>{pagination()}</ul>
            </nav>
        </div>
    );
};

export default Home;
