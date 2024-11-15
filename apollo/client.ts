import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { apiUrl } from '@/lib/config';
import { useGlobalStore } from '@/context/globalProvider';

const httpLink = createHttpLink({
  uri: apiUrl,
  includeUnusedVariables: true,
});

const authLink = setContext(async (_, { headers }) => {
  const { session } = useGlobalStore.getState();
  const token = session?.access_token;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      'Apollo-Require-Preflight': 'true',
    },
    credentials: true,
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
