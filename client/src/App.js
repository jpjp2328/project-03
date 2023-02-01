import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// importing components and pages
import Home from './pages/Home';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
