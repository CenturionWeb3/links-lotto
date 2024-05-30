"use client";

import React from "react";
import { ConnectButton } from "thirdweb/react";
import { chain, client } from "../../utils/constants";

function Header() {
  return (
    <header className="grid grid-cols-2 md:grid-cols-3 justify-between items-center p-5">
      {/* Left */}
      <div className="flex items-center space-x-2">
        <img className="rounded-full h-20 w-20" src="/spin.gif" />
        <div>
          <h1 className="text-4xl text-white font-bold">Links Lotto</h1>
        </div>
      </div>
      <div className="hidden md:flex md:col-span-1 items-center justify-center rounded-md"></div>
      {/* Right */}
      <div className="flex md:col-span-1 justify-end">
        <ConnectButton client={client} chain={chain} />
      </div>
    </header>
  );
}

export default Header;
