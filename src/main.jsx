import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import { GithubProvider } from "./context/context";
// dev-cyhk7apbqd7in5kh.us.auth0.com
// 0uNAzbfTvNX9Kkn7x4HMCqrlRZD5Fbi8
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-cyhk7apbqd7in5kh.us.auth0.com"
      clientId="0uNAzbfTvNX9Kkn7x4HMCqrlRZD5Fbi8"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);
