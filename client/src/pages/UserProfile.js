import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Auth from '../utils/auth';
import { GET_SINGLE_USER, GET_POST_BY_USER } from '../utils/queries';
import Sidebar from '../components/Sidebar';
import UserCard from '../components/UserCard';
import PostCard from '../components/PostCard';

const UserProfile = () => {
    let params = useParams();

    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { username: params.username }
    });

    const { data: posts } = useQuery(GET_POST_BY_USER);

    if (loading) return <p> Loading... </p>;

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
                                <div className='container justify-content-center' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <br />
                                    <UserCard user={data.singleUser} />
                                </div>
                                <hr />
                                <div className='p-5 my-5'>
                                    <h4 className='text-center p-2'>{data.singleUser.username}'s Posts</h4>
                                    <div className='row p-3'>
                                        {posts &&
                                            posts.postByUser.map(post => (
                                                <div className='col-md-4 p-2' key={post._id}>
                                                    <PostCard post={post} />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {JSON.stringify(posts)}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    Login or SignUp to view user!
                </>
            )}
        </div>
    )
}

export default UserProfile

