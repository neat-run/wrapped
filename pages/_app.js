import "tailwindcss/tailwind.css";
import "../styles/global.css";
import apollo from "../utils/apollo";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
