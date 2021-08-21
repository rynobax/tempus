import React from "react";
import { UserManager } from "oidc-client";
import env from "./env";

const manager = new UserManager({
  authority: "https://steamcommunity.com/openid/",
  client_id: env.STEAM_API_KEY,
  redirect_uri: "localhost:3000",
});

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  function signIn() {
    manager.signinRedirect();
  }

  return (
    <header>
      <div className="flex flex-row">
        <div className="flex-1">
          <span>Tempus But Better</span>
        </div>
        <div className="flex-initial">
          <button onClick={signIn}>Login with Steam</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
