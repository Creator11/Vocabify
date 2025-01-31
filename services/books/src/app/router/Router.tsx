import { createBrowserRouter } from "react-router-dom";

import { Suspense } from "react";

import { App } from "../App";
import { LazyShop } from "@/pages/Shop/Shop.lazy";

const routes = [
  {
    path: "/books",
    element: <App />,
    children: [
      {
        path: "/books/shop",
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyShop />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
