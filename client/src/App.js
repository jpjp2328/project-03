import React, { useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client'

// importing components and pages
import { GET_ALL_POSTS } from './utils/queries';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [posts, setPosts] = useState([])
  client.query({
    query: GET_ALL_POSTS
  }).then(result => setPosts(result.data.allPosts));

  return (
    <>
      <div className='container'>
        <div className='row p-5'>
          {posts.map(post => (
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
    </>
  );
};

export default App;
