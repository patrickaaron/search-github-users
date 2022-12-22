import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import mockUser from "./mockData/mockUser";
import mockRepos from "./mockData/mockRepos";
import mockFollowers from "./mockData/mockFollowers";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider

export const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0); // remaining requests
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" }); // error handling

  // Search github user
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { followers_url, repos_url } = response.data;
      // wait for both requests to fulfill
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ])
        .then((results) => {
          const [repos, followers] = results; // results is an array
          const fulfilled = "fulfilled";
          if (repos.status === fulfilled) {
            setRepos(repos.value.data);
          }
          if (followers.status === fulfilled) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      toggleError(true, "user does not exist!");
    }
    checkRequests();
    setIsLoading(false);
  };
  // Check rate limit
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        const {
          rate: { remaining }
        } = data;
        setRequests(remaining);
        if (remaining <= 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GithubContext);
};
