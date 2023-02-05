import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Auth from '../utils/auth';
import { GET_SINGLE_USER } from '../utils/queries';
import Sidebar from '../components/Sidebar';
import UserCard from '../components/UserCard';

const UserProfile = () => {
    let params = useParams();

    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { username: params.username }
    });

    

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
                                    <br/>
                                    <UserCard user={data.singleUser} />
                                </div>
                            </div>
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

