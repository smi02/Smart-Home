// import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ShowDevice from "./pages/ShowDevice"
import CreateDevice from "./pages/CreateDevice"
import EditDevice from "./pages/EditDevice"
import DeleteDevice from "./pages/DeleteDevice"
import Narbar from "./components/Narbar"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Toaster } from 'react-hot-toast'
import User from "./pages/User"


const App = () => {
  return (
    <>
      <Narbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/device/details/:id" element={<ShowDevice />} />
        <Route path="/device/create" element={<CreateDevice />} />
        <Route path="/device/edit/:id" element={<EditDevice />} />
        <Route path="/device/delete/:id" element={<DeleteDevice />} />
      </Routes>
    </>
  )
}

export default App