"use client";

import React from "react";
import Draw from "../components/Draw";
import Login from "../components/Login";
import { useActiveAccount } from "thirdweb/react";

function page() {
  const account = useActiveAccount();
  return <div>{account ? <Draw /> : <Login />}</div>;
}

export default page;
