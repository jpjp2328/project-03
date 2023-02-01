import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// importing components and pages
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
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
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
};

export default App;
