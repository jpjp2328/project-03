import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

// importing components and pages
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyProfile from './pages/MyProfile'
import CreatePost from './pages/CreatePost'
import FriendList from './pages/FriendList';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              exact path='/'
              element={<Home />}
            />
            <Route
              exact path='/login'
              element={<Login />}
            />
            <Route
              exact path='/signup'
              element={<Signup />}
            />
            <Route
              exact path='/profile'
              element={<MyProfile />}
            />
            <Route
              exact path='/post/create'
              element={<CreatePost />}
            />
            <Route
              exact path='/user/friends'
              element={<FriendList />}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
};

export default App;
