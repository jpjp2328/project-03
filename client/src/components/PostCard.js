import React from 'react';

const PostCard = ({ post }) => {
    const { text, image, author } = post
    return (
        <div className='card text-center' style={{ minHeight: '350px' }}>
            <div className='card-body'>
                <img src={image.url} key={image.public_id} alt={image.public_id} style={{ height: '100px' }} className='img-thumbnail m-3' />
                <h4 className='text-primary'>{author.username}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
};

export default PostCard