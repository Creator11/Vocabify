import { createBrowserRouter } from "react-router";

// @ts-ignore
import cardsRoutes from "cards/Router";
// @ts-ignore
import booksRoutes from "books/Router"; 
// @ts-ignore
import vocabularyRoutes from "vocabulary/Router"; 
import App from "@/app/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...cardsRoutes,...vocabularyRoutes, ...booksRoutes],
  },
]);
