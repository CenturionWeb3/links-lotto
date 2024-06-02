"use client";

import React from "react";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client, wallets, chain } from "../../utils/constants";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img className="rounded-full h-200 w-200" src="/spin.gif" />
        <h1 className="text-6xl text-white font-bold">WELCOME TO</h1>
        <h1 className="text-6xl text-white font-bold">THE LINKS LOTTO</h1>
        <br />
        <h3 className="text-xl text-white font-bold w-2/3 md:w-1/2 xl:w-3/5">
          Connect your wallet below to enter the dApp and buy your tickets for a
          raffle that will take place every Sunday at the end of our weekly
          spaces on X!
        </h3>
        <div className="px-8 py-5 mt-5">
          <ConnectButton
            client={client}
            wallets={wallets}
            chain={chain}
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
        <h3 className="text-md text-white w-2/3 md:w-1/2 xl:w-3/5">
          Disclaimer: Alliance members and collaboration projects that
          participate in weekly retweets of Links Lotto will be eligible for the
          prizes of buybacks and burns. Additionally, entries are open to all
          crypto enthusiasts. You do not have to be invested in InterLink or any
          project affiliated with the InterLink ecosystem.
        </h3>
      </div>
    </div>
  );
}

export default Login;
