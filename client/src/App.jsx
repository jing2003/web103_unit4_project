import React from "react";
import Navigation from "./components/Navigation";
import { useRoutes } from "react-router-dom";
import Gallery from "./pages/Gallery";
import CreateFurina from "./pages/CreateFurina";
import FurinaDetails from "./pages/FurinaDetails";
import EditFurina from "./pages/EditFurina";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Gallery title="Furina Custom Studio" />,
    },
    {
      path: "/create",
      element: <CreateFurina title="Furina CS | Custom Furina" />,
    },
    {
      path: "/furinas/:id",
      element: <FurinaDetails title="Furina CS | View Furina" />,
    },
    {
      path: "/furinas/:id/edit",
      element: <EditFurina title="Furina CS | Edit Furina" />,
    },
    {
      path: "*",
      element: <NotFound title="Furina CS | 404 Not Found" />,
    },
  ]);

  return (
    <div>
      <Navigation />
      {element}
    </div>
  );
};

export default App;
