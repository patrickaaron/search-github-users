import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalContext();
  // Find the most used and most popular languages in the repos
  const { languages, stars, forks } = repos.reduce(
    (total, current, index) => {
      const { name, language, stargazers_count, forks } = current;
      if (!language) {
        return total;
      }
      if (!total.languages[language]) {
        total.languages[language] = {
          label: language,
          value: 1,
          stars: stargazers_count
        };
      } else {
        total.languages[language].value += 1;
        total.languages[language].stars += stargazers_count;
      }
      total.stars[index] = { label: name, value: stargazers_count };
      total.forks[index] = { label: name, value: forks };
      return total;
    },
    { languages: {}, stars: {}, forks: {} }
  );
  // Convert the object to an array, sort it, and return the first 5
  const mostUsedLan = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value; // descending order
    })
    .slice(0, 5);

  const starsPerLan = Object.values(languages)
    .map((item) => {
      const { label, stars } = item;
      return { label, value: stars };
    })
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostPopularRepo = Object.values(stars)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostForkedRepo = Object.values(forks)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLan} />
        <Column3D data={mostPopularRepo} />
        <Doughnut2D data={starsPerLan} />
        <Bar3D data={mostForkedRepo} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
