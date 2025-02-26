import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Client from "./pages/client.jsx";
import Artist_Description from "./pages/Artist_Description/Artist_Description.jsx";
import BookNow from "./pages/booknow/booknow.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/client" element={<Client />} />
        <Route path="/artists/:id" element={<Artist_Description />} />
        <Route path="/book-now/:id" element={<BookNow />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
