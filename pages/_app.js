import "tailwindcss/tailwind.css";
import "../styles/global.css";
import apollo from "../utils/apollo";
import { ApolloProvider } from "@apollo/client";
import { IdProvider } from "@radix-ui/react-id";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </ApolloProvider>
  );
}

export default MyApp;
