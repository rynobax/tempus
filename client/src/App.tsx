import React, { useState } from "react";

import Body from "./components/Body";
import Header from "./components/Header";
import { UserIdProvider } from "./services/tempus";

function App() {
  return (
    <UserIdProvider value="74181">
      <div className="min-h-screen min-w-full">
        <Header />
        <Body />
      </div>
    </UserIdProvider>
  );
}

export default App;
