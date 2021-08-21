import React, { useState } from "react";

import Body from "./components/Body";
import Header from "./components/Header";
import { UserIdProvider } from "./services/tempus";

function App() {
  function openFilters() {}
  function openLogin() {}

  return (
    <UserIdProvider value="74181">
      <div className="min-h-screen min-w-full bg-gray-500">
        <Header
          openFilters={openFilters}
          openLogin={openLogin}
          playerName={null}
        />
        <Body />
      </div>
    </UserIdProvider>
  );
}

export default App;
