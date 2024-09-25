import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuth } from '@/lib/getAuth';
import { apiUrl } from '@/lib/config';

const httpLink = createHttpLink({
  uri: apiUrl,
  includeUnusedVariables: true,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await getAuth()).accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
