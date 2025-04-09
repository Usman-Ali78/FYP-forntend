import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Routes from "./Routes";

const router = createBrowserRouter(Routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense
      fallback={
        <h1 className="text-3xl text-center font-semibold text-red-500 italic">
          Loading...
        </h1>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
