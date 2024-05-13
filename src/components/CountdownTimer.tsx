"use client";

import React from "react";
import { useReadContract } from "thirdweb/react";
import Countdown from "react-countdown";
import { CONTRACT } from "../../utils/constants";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

function CountdownTimer() {
  const { data: expiration, isLoading: isLoadingExpiration } = useReadContract({
    contract: CONTRACT,
    method: "expiration",
  });
  const expire = Number(expiration);

  const renderer = ({ hours, minutes, seconds, completed }: Props) => {
    if (completed) {
      return (
        <div>
          <h2 className="text-white text-xl text-center animate-bounce">
            Ticket Sale have now CLOSED for this draw
          </h2>

          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown animate-pulse">{hours}</div>
              <div className="countdown-label">hours</div>
            </div>

            <div className="flex-1">
              <div className="countdown animate-pulse">{minutes}</div>
              <div className="countdown-label">minutes</div>
            </div>

            <div className="flex-1">
              <div className="countdown animate-pulse">{seconds}</div>
              <div className="countdown-label">seconds</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown">{hours}</div>
              <div className="countdown-label">hours</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{minutes}</div>
              <div className="countdown-label">minutes</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{seconds}</div>
              <div className="countdown-label">seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };

  if (isLoadingExpiration) return null;

  return (
    <div>
      <Countdown date={new Date(expire * 1000)} renderer={renderer} />
    </div>
  );
}

export default CountdownTimer;
