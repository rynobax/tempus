import React from "react";
import {} from "oidc-client";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <div className="flex flex-row">
        <div className="flex-1">
          <span>Tempus But Better</span>
        </div>
        <div className="flex-initial">
          <button>Login with Steam</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
