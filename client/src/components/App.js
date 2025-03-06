import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CommentProvider } from "../context/comment";
import { UserProvider } from "../context/user";
import NavBar from "./NavBar";
import './App.css'

function App() {
  return (
    <div>
      <UserProvider>
        <CommentProvider>
          <NavBar />
          <>
            <Outlet />
          </>
        </CommentProvider>
      </UserProvider>
    </div>
  )
}

export default App;
