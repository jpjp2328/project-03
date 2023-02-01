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
    <p>Hello</p>
  );
};

export default App;
