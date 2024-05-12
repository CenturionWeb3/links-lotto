import React from "react";
import { PropagateLoader } from "react-spinners";

function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-10">
        <img className="rounded-full h-20 w-20 mb-10" src="/Interlink.jpeg" />
        <h1 className="text-lg text-white font-bold">Loading Link Lotto</h1>
      </div>
      <PropagateLoader color="white" size={30} />
    </div>
  );
}

export default Loading;
