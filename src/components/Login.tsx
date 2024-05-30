"use client";

import React from "react";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client, wallets } from "../../utils/constants";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img className="rounded-full h-56 w-56 mb-10" src="/spin.gif" />
        <h1 className="text-6xl text-white font-bold">THE LINK LOTTO</h1>
        <div className="px-8 py-5 mt-5">
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={darkTheme({
              colors: {
                primaryButtonBg: "#44403c",
                primaryButtonText: "#d6d3d1",
              },
            })}
            connectModal={{
              size: "compact",
              title: "Connect Wallet",
              titleIcon: "",
              showThirdwebBranding: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
