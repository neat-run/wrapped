import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apollo = (token) =>
  new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: { authorization: `Bearer ${token}` },
  });
