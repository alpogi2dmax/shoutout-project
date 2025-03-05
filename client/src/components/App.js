import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CommentProvider } from "../context/comment";

function App() {
  return (
    <div>
      <CommentProvider>
        <Outlet />
      </CommentProvider>
    </div>
  )
}

export default App;
