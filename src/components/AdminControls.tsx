"use client";

import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import { useReadContract, TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { ethers } from "ethers";
import { CONTRACT, currency } from "../../utils/constants";

function AdminControls() {
  const { data: totalCommission } = useReadContract({
    contract: CONTRACT,
    method: "operatorTotalCommission",
  });
  const DrawWinnerTicket = prepareContractCall({
    contract: CONTRACT,
    method: "DrawWinnerTicket",
  });
  const WithdrawCommission = prepareContractCall({
    contract: CONTRACT,
    method: "WithdrawCommission",
  });
  const restartDraw = prepareContractCall({
    contract: CONTRACT,
    method: "restartDraw",
  });
  const RefundAll = prepareContractCall({
    contract: CONTRACT,
    method: "RefundAll",
  });

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commission to be withdrawn:{" "}
        {totalCommission && ethers.formatEther(totalCommission?.toString())}{" "}
        {currency}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-center">
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "DrawWinnerTicket",
            })
          }
          className="admin-button"
          onTransactionSent={() => console.log("drawing winner...")}
        >
          <StarIcon className="h-6 mx-auto mb-2" />
          Draw Winner
        </TransactionButton>
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "WithdrawCommission",
            })
          }
          className="admin-button"
          onTransactionSent={() => console.log("withdrawing...")}
        >
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commission
        </TransactionButton>
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "restartDraw",
            })
          }
          className="admin-button"
          onTransactionSent={() => console.log("Restarting...")}
        >
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </TransactionButton>
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "RefundAll",
            })
          }
          className="admin-button"
          onTransactionSent={() => console.log("refunding all...")}
        >
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </TransactionButton>
      </div>
    </div>
  );
}

export default AdminControls;
