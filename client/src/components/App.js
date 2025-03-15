import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CommentProvider } from "../context/comment";
import { UserProvider } from "../context/user";
import { UserPageProvider } from "../context/userpage";
import NavBar from "./NavBar";
import './App.css'

function App() {
  return (
    <div>
      <UserProvider>
        <CommentProvider>
          <UserPageProvider>
            <NavBar />
            <>
              <Outlet />
            </>
          </UserPageProvider>
        </CommentProvider>
      </UserProvider>
    </div>
  )
}

export default App;
