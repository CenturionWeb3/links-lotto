"use client";

import React from "react";
import Draw from "../components/Draw";
import Login from "../components/Login";
import { useActiveAccount } from "thirdweb/react";

function page() {
  const account = useActiveAccount();
  return (
    <div>
      {/*<h1 className="text-4xl font-bold">HOME</h1>*/}
      {account ? <Draw /> : <Login />}
    </div>
  );
}

export default page;
