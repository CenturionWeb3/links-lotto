"use client";

import React from "react";
import Header from "./Header";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { CONTRACT, OLDCONTRACT, currency } from "../../utils/constants";
import { prepareContractCall, toWei } from "thirdweb";
import CountdownTimer from "./CountdownTimer";
import AdminControls from "./AdminControls";
import { ethers } from "ethers";
import Marquee from "react-fast-marquee";

function Draw() {
  const wallet = useActiveAccount()?.address || "No Wallet Connected";
  console.log(wallet);
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { data: remainingTickets } = useReadContract({
    contract: CONTRACT,
    method: "RemainingTickets",
  });

  const { data: maxTickets } = useReadContract({
    contract: CONTRACT,
    method: "maxTickets",
  });

  let soldTickets: bigint | undefined;

  if (remainingTickets !== undefined && maxTickets !== undefined) {
    soldTickets = maxTickets - remainingTickets;
  } else {
    soldTickets = undefined; // or any other fallback value you prefer
  }
  const { data: prizePool, isLoading: poolLoading } = useReadContract({
    contract: CONTRACT,
    method: "CurrentWinningReward",
  });
  const { data: ticketPrice } = useReadContract({
    contract: CONTRACT,
    method: "ticketPrice",
  });
  const { data: commission } = useReadContract({
    contract: CONTRACT,
    method: "commission",
  });
  const { data: tickets } = useReadContract({
    contract: CONTRACT,
    method: "getTickets",
  });
  // const { data: isLotteryOperator } = useReadContract({
  //   contract: CONTRACT,
  //   method: "lotteryOperator",
  // });
  const { data: lastWinner } = useReadContract({
    contract: CONTRACT,
    method: "lastWinner",
  });
  const { data: lastWinnerAmount } = useReadContract({
    contract: CONTRACT,
    method: "lastWinnerAmount",
  });
  const { data: prize } = useReadContract({
    contract: CONTRACT,
    method: "getWinningsForAddress",
    params: [wallet],
  });
  const winnings = prize ?? 0;
  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = [...tickets];

    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === wallet ? total + 1 : total),
      0
    );

    setUserTickets(noOfUserTickets);
  }, [tickets, wallet]);

  console.log(userTickets);

  return (
    <div>
      {poolLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex-col">
            <Header />
            <Marquee
              className="bg-stone-900 p-5 mb-5"
              gradient={false}
              speed={100}
            >
              <div className="flex space-x-2 mx-10">
                <h4 className="text-white font-bold">
                  LAST WEEK'S WINNER: {lastWinner?.substring(0, 5)}...
                  {lastWinner?.substring(
                    lastWinner.length,
                    lastWinner.length - 5
                  )}
                  {/* {lastWinner?.toString()} */}
                </h4>
                <h4 className="text-white font-bold">
                  PRIZE:{" "}
                  {lastWinnerAmount &&
                    ethers.formatEther(lastWinnerAmount?.toString())}
                  {currency}{" "}
                </h4>
              </div>
            </Marquee>
            <div>
              {/* {isLotteryOperator === wallet ? (
                <div>
                  <AdminControls />
                </div>
              ) : (
                <div></div>
              )} */}
              {winnings > 0 && (
                <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: "WithdrawWinnings",
                        params: [wallet],
                      })
                    }
                    className="winner-button"
                    onTransactionSent={() =>
                      console.log("withdrawing winnings...")
                    }
                  >
                    <p className="font-bold text-5xl">WE HAVE A WINNER!</p>
                    <p className="font-semibold text-2xl">
                      Congratulations! You have won{" "}
                      {ethers.formatEther(winnings.toString())} {currency}!
                    </p>
                    <p className="font-semibold text-xl pt-4">
                      Click here to claim your prize!
                    </p>
                  </TransactionButton>
                </div>
              )}
            </div>
            <div className="space-y-5 md:space-y-0 m-5 md:flex  md:flex-row items-start justify-center md:space-x-5">
              <div className="stats-container">
                <h1 className="text-5xl text-white font font-semibold text-center">
                  {" "}
                  PRIZE POOLS
                </h1>
                <div className="flex justify-center mx-3 p-2 space-x-10">
                  <div className="flex-1">
                    <div className="pool-label">Winner Receives:</div>
                    <div className="stats">
                      {poolLoading ? (
                        <p className="text-xl">...</p>
                      ) : (
                        <p className="text-3xl text-center pt-2">
                          {Number(prizePool) / 10 ** 18 / 4} {currency}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="pool-label">Alliance Receives:</div>
                    <div className="stats">
                      {poolLoading ? (
                        <p className="text-xl">...</p>
                      ) : (
                        <p className="text-3xl text-center pt-2">
                          {Number(prizePool) / 10 ** 18 / 4} {currency}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* The Next Draw Box */}
            <div className="space-y-5 h-84 md:space-y-0 h-84 m-5 md:flex lg:flex-row items-stretch justify-center md:space-x-5">
              <div className="stats-container">
                <h1 className="text-4xl lg:text-5xl text-white font font-semibold text-center">
                  NEXT WEEKLY DRAW
                </h1>
                <br />
                <h2 className="text-3xl lg:text-4xl text-white font font-semibold text-center">
                  {soldTickets && soldTickets?.toString()} Tickets Sold!
                </h2>
                <div className="flex justify-between p-2 space-x-2">
                  {/* <div className="stats">
                    <h2 className="text-sm">Tickets Remaining</h2>
                    {remainingLoading ? (
                      <p className="text-xl">...</p>
                    ) : (
                      <p className="text-xl">{RemainingTickets?.toString()}</p>
                    )}
                  </div> */}
                </div>
                <div className="mt-5 mb-3">
                  <CountdownTimer />
                </div>
                {/* Countdown Timer */}
                {/* ... */}
              </div>

              <div className="stats--container space-y-2">
                <div className="stats-container space-y-6 md:w-full">
                  <div className="flex font-bold text-base justify-between item-center text-white mt-6 pt-5">
                    <p>Ticket Price</p>
                    <p>
                      {Number(ticketPrice) / 10 ** 18} {currency}
                    </p>
                  </div>
                  <div className="flex text-white items-center space-x-2 bg-stone-900 border-stone-600 border pe-4">
                    <p>TICKETS</p>
                    <input
                      className="flex w-full bg-transparent text-right outline-none"
                      type="number"
                      min={1}
                      max={15}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2 mt-5">
                    <div className="flex items-center justify-between text-stone-200 text-s italic font-extrabold space-x-2">
                      <p>Total Cost</p>
                      <p>
                        {(Number(ticketPrice) / 10 ** 18) * quantity} {currency}
                      </p>
                    </div>

                    {/* <div className="flex items-center justify-between text-stone-300 text-xs italic">
                      <p>Service Fees</p>
                      <p>
                        {commission &&
                          Number(ethers.formatEther(commission.toString())) *
                            quantity}{" "}
                        {currency}
                      </p>
                    </div> */}

                    <div className="flex items-center justify-between text-stone-300 text-xs italic font-semibold">
                      <p>+ Gas Fees</p>
                      <p>TBD</p>
                    </div>
                  </div>
                  <div className="flex flex-col pb-4">
                    <TransactionButton
                      transaction={() =>
                        prepareContractCall({
                          contract: CONTRACT,
                          method: "BuyTickets",
                          value: toWei((0.01 * quantity).toString()),
                        })
                      }
                      className="admin-button"
                      onTransactionSent={() => console.log("drawing winner...")}
                    >
                      Buy {quantity} Tickets
                    </TransactionButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex place-content-center">
              <div>
                {userTickets > 0 && (
                  <div className="stats">
                    <p className="text-lg mb-2">
                      You have {userTickets} tickets in this draw
                    </p>

                    <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2 mt-5">
                      {Array(userTickets)
                        .fill("")
                        .map((_, index) => (
                          <p
                            key={index}
                            className="text-stone-300 h-20 w-12 bg-stone-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
                          >
                            {index + 1}
                          </p>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Draw;
