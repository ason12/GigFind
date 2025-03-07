import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Client from "./pages/client.jsx";
import Artist_Description from "./pages/Artist_Description/Artist_Description.jsx";
import BookNow from "./pages/booknow/booknow.jsx";
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import RegistrationSuccess from "./auth/RegistrationSuccess.jsx";
import ClientLogin from "./auth/clientLogin.jsx";
import ClientRegister from "./auth/clientRegister.jsx";
import ClientRegistrationSuccess from "./auth/clientRegistrationSuccess.jsx";
import Dashboard from "./pages/manager/dashboard.jsx";
import Artists from "./pages/manager/Artists.jsx";
import HelpCenter from "./pages/HelpCenter/helpcenter.jsx";
import Bookings from "./pages/booking/booking.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/client" element={<Client />} />
        <Route path="/artists/:id" element={<Artist_Description />} />
        <Route path="/book-now/:id" element={<BookNow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/client-register" element={<ClientRegister />} />
        <Route
          path="/client-registration-success"
          element={<ClientRegistrationSuccess />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager/artists" element={<Artists />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/booking" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
