import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <SearchPage /> },
        { path: "movie/:imdbID", element: <DetailsPage /> },
        { path: "favorites", element: <FavoritesPage /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);
