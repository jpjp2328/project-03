import React, { useState } from 'react';
import { useQuery } from '@apollo/client'


// importing queries
import { GET_ALL_POSTS, GET_TOTAL_POSTS } from '../utils/queries';
import PostCard from '../components/PostCard';
import '../index.css'

function Home() {

    const [page, setPage] = useState(1);

    const { data, loading } = useQuery(GET_ALL_POSTS, {
        variables: { page: page }
    });

    const { data: postCount } = useQuery(GET_TOTAL_POSTS);

    let totalPages;
    const pagination = () => {
        totalPages = Math.ceil(postCount && postCount.totalPosts / 6);
        if (totalPages > 15) totalPages = 15
        // console.log(totalPages)
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li>
                    <button className={`page-link ${page === i && 'current-page'}`} onClick={() => setPage(i)}>{i}</button>
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
                <ul className='pagination justify-content-center'>
                    <li>
                        <button className={`page-link ${page === 1 && 'disable'}`} onClick={() => setPage(1)}>Back</button>
                    </li>
                    {pagination()}
                    <li>
                        <button className={`page-link ${page === totalPages && 'disable'}`} onClick={() => setPage(totalPages)}>Next</button>
                    </li>
                </ul>

            </nav>
        </div>
    );
};

export default Home;
