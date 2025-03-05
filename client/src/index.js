import React from "react";
import App from "./components/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes.js';
import { createRoot } from "react-dom/client";

const router = createBrowserRouter(routes)
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router}/>);
