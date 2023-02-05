import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, showDeleteButton = false, handleDelete = (f) => f }) => {
    const { text, image, author } = post
    const navigate = useNavigate();

    return (
        <div className='card text-center post-card' style={{ minHeight: '350px' }}>
            <div className='card-body'>
                <img onClick={() => navigate(`/post/${post._id}`)} src={image.url} key={image.public_id} alt={image.public_id} style={{ height: '140px' }} className='img-thumbnail m-3' />
                <h4 className='text-primary'>{text}</h4>
                <hr/>
                <p onClick={() => navigate(`/user/${author.username}`)}>{author.username}</p>
                {showDeleteButton && (
                    <button onClick={() => handleDelete(post._id)} className='btn btn-danger'>Delete</button>
                )}
            </div>
        </div>
    )
};

export default PostCard