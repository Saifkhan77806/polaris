import React from "react";
import { Spinner } from "./ui/spinner";

const AuthLoadingview = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Spinner className="size-6 text-ring" />
    </div>
  );
};

export default AuthLoadingview;
