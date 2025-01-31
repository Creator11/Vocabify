import { Suspense } from "react";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
  createHashRouter,
} from "react-router";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"; 
import { HomePage } from "@/pages/HomePage/HomePage";
import { NotFound } from "@/pages/NotFound/NotFound";
import { App } from "@/app/App";

 

const routes = [
  {
    path: "/cards",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/cards/home",
        element: (
          <Suspense>
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      { path: "/cards/404", element: <NotFound /> },
      {
        path: "*",
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes);

export default routes;
