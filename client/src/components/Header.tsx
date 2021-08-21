import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <div className="flex flex-row">
        <div className="flex-1">
          <span>Tempus But Better</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
