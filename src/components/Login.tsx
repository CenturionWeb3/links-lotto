"use client";

import React from "react";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../../utils/constants";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img className="rounded-full h-56 w-56 mb-10" src="/Interlink.jpeg" />
        <h1 className="text-6xl text-white font-bold">THE LINK LOTTO</h1>
        <div className="px-8 py-5 mt-5">
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={"dark"}
            connectModal={{ size: "compact" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
