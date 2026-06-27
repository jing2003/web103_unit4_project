import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <h1>Furina Custom Studio</h1>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="/create">
            <button>Create</button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <button>Gallery</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
