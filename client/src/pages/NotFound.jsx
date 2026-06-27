import React from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../utilities/usePageTitle";

const NotFound = ({ title }) => {
  usePageTitle(title);

  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          This page does not exist. The URL may be incorrect, or the Furina
          design you are looking for may not be available.
        </p>

        <Link to="/" role="button">
          Back to Gallery
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
