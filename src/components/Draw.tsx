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
import { CONTRACT, currency } from "../../utils/constants";
import { prepareContractCall, toWei } from "thirdweb";
import CountdownTimer from "./CountdownTimer";
import AdminControls from "./AdminControls";
import { ethers } from "ethers";
import Marquee from "react-fast-marquee";

function Draw() {
  const wallet = useActiveAccount()?.address;
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { data: RemainingTickets, isLoading: remainingLoading } =
    useReadContract({
      contract: CONTRACT,
      method: "RemainingTickets",
    });
  const { data: prizePool, isLoading: poolLoading } = useReadContract({
    contract: CONTRACT,
    method: "CurrentWinningReward",
  });
  const { data: ticketPrice } = useReadContract({
    contract: CONTRACT,
    method: "ticketPrice",
  });
  const { data: ticketCommission } = useReadContract({
    contract: CONTRACT,
    method: "ticketCommission",
  });
  const { data: tickets } = useReadContract({
    contract: CONTRACT,
    method: "getTickets",
  });
  const { data: isLotteryOperator } = useReadContract({
    contract: CONTRACT,
    method: "lotteryOperator",
  });
  const { data: lastWinner } = useReadContract({
    contract: CONTRACT,
    method: "lastWinner",
  });
  const { data: lastWinnerAmount } = useReadContract({
    contract: CONTRACT,
    method: "lastWinnerAmount",
  });
  const { data: winnings } = useReadContract({
    contract: CONTRACT,
    method: "getWinningsForAddress",
    params: [wallet],
  });

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === wallet ? total + 1 : total),
      0
    );

    setUserTickets(noOfUserTickets);
  }, [tickets, wallet]);

  console.log(userTickets);

  return (
    <div>
      {remainingLoading ? (
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
                  Last Winner: {lastWinner?.toString()}
                </h4>
                <h4 className="text-white font-bold">
                  Previous winnings:{" "}
                  {lastWinnerAmount &&
                    ethers.formatEther(lastWinnerAmount?.toString())}
                  BNB{" "}
                </h4>
              </div>
            </Marquee>
            <div>
              {isLotteryOperator === wallet ? (
                <div>
                  <AdminControls />
                </div>
              ) : (
                <div></div>
              )}
              {winnings > 0 && (
                <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: "WithdrawWinnings",
                      })
                    }
                    className="winner-button"
                    onTransactionSent={() =>
                      console.log("withdrawing winnings...")
                    }
                  >
                    <p className="font-bold">Winner Winner Chicken Dinner</p>
                    <p>
                      Total Winnings: {ethers.formatEther(winnings.toString())}{" "}
                      {currency}
                    </p>
                    <br />
                    <p className="font-semibold">Click here to withdraw</p>
                  </TransactionButton>
                </div>
              )}
            </div>
            {/* The Next Draw Box */}
            <div className="space-y-5 md:space-y-0 m-5 mt-32 md:flex  md:flex-row items-start justify-center md:space-x-5">
              <div className="stats-container">
                <h1 className="text-5xl text-white font font-semibold text-center">
                  {" "}
                  The Next Draw
                </h1>
                <div className="flex justify-between p-2 space-x-2">
                  <div className="stats">
                    <h2 className="text-sm">Total Prize Pool</h2>
                    {poolLoading ? (
                      <p className="text-xl">...</p>
                    ) : (
                      <p className="text-xl">
                        {prizePool && ethers.formatEther(prizePool?.toString())}{" "}
                        {currency}
                      </p>
                    )}
                  </div>
                  <div className="stats">
                    <h2 className="text-sm">Tickets Remaining</h2>
                    {remainingLoading ? (
                      <p className="text-xl">...</p>
                    ) : (
                      <p className="text-xl">{RemainingTickets?.toString()}</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 mb-3">
                  <CountdownTimer />
                </div>
                {/* Countdown Timer */}
                {/* ... */}
              </div>

              <div className="stats--container space-y-2">
                <div className="stats-container">
                  <div className="flex justify-between item-center text-white pb-2">
                    <h2>Price Per Ticket</h2>
                    <p>
                      {ticketPrice &&
                        ethers.formatEther(ticketPrice?.toString())}{" "}
                      {currency}
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
                    <div className="flex items-center justify-between text-stone-400 text-s italic font-extrabold">
                      <p>Total Cost of Tickets</p>
                      <p>
                        {ticketPrice &&
                          Number(ethers.formatEther(ticketPrice.toString())) *
                            quantity}{" "}
                        {currency}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-stone-300 text-xs italic">
                      <p>Service Fees</p>
                      <p>
                        {ticketCommission &&
                          Number(
                            ethers.formatEther(ticketCommission.toString())
                          ) * quantity}{" "}
                        {currency}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-stone-300 text-xs italic">
                      <p>+ Gas Fees</p>
                      <p>TBD</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <TransactionButton
                      transaction={() =>
                        prepareContractCall({
                          contract: CONTRACT,
                          method: "BuyTickets",
                          value: toWei((0.01 * quantity).toString()),
                        })
                      }
                      style={{ margin: 15 }}
                      className="admin-button"
                      onTransactionSent={() => console.log("drawing winner...")}
                    >
                      Buy {quantity} tickets for{" "}
                      {ticketPrice &&
                        Number(ethers.formatEther(ticketPrice.toString())) *
                          quantity}{" "}
                      {currency}
                    </TransactionButton>
                  </div>
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
        </div>
      )}
    </div>
  );
}

export default Draw;
