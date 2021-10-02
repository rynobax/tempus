import React, { useState } from "react";

interface HeaderProps {
  playerName: string | null;
  openFilters: () => void;
  openLogin: () => void;
  openStats: () => void;
}

const Header: React.FC<HeaderProps> = ({
  playerName,
  openFilters,
  openLogin,
  openStats,
}) => {
  return (
    <div className="sticky mx-auto flex top-2 rounded shadow bg-white w-max">
      <button className="py-1 px-4" onClick={openLogin}>
        {playerName ? playerName : "Set Player Id"}
      </button>
      <div className="border-l-2" />
      <button className="py-1 px-4" onClick={openStats}>
        View Stats
      </button>
      <div className="border-l-2" />
      <button className="py-1 px-4" onClick={openFilters}>
        Edit Filters
      </button>
    </div>
  );
};

export default Header;
