import React from 'react';

const UserCard = ({ user }) => {
    const { username, profilePicture, about } = user
    return (
        <div className='card text-center' style={{ minHeight: '350px' }}>
            <div className='card-body'>
                <img src={profilePicture[0].url} key={profilePicture[0].public_id} alt={profilePicture[0].public_id} style={{ height: '100px' }} className='img-thumbnail m-3' />
                <h4 className='text-primary'>{username}</h4>
                <p>{about}</p>
            </div>
        </div>
    )
};

export default UserCard