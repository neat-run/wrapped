import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import supabase from "./supabase";

// Not sure what this does. See https://tinyurl.com/y93u9k5k.
const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

/**
 * Before every request, get the user's GitHub API token
 */
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get the API token from the Supabase session
  const session = supabase.auth.session();
  const token = session.provider_token;

  // Add the token to the request context
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));

  return forward(operation);
});

/**
 * Apollo client to make calls to GitHub graphQL
 */
const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default apollo;
