import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import "./index.css"; // TailwindCSS or custom CSS

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SearchPage /> }, // default page
      { path: "favorites", element: <FavoritesPage /> }, // favorites page
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
