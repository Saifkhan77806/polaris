// localhost:3000/demo

"use client";

import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

const DemoPage = () => {
  const { userId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleBlocking = async () => {
    setLoading(true);
    await fetch("/api/demo/blocking", { method: "POST" });
    setLoading(false);
  };

  const handleBackground = async () => {
    setLoading2(true);
    await fetch("/api/demo/background", { method: "POST" });
    setLoading2(false);
  };

  const handleClientError = () => {
    Sentry.logger.info("User attemping to click on client information", {
      userId,
    });
    throw new Error("Client error: Something went wrong in the browser!");
  };

  const hanldeApiError = async () => {
    await fetch("/api/demo/error", { method: "POST" });
  };

  const handleInngestError = async () => {
    await fetch("/api/demo/inngest-error", { method: "POST" });
  };

  return (
    <div className="p-8 space-x-4">
      <Button onClick={handleBlocking} disabled={loading}>
        {loading ? "Loading..." : "Blocking"}
      </Button>

      <Button onClick={handleBackground} disabled={loading2}>
        {loading2 ? "Background Loading..." : "Background"}
      </Button>

      <Button onClick={handleClientError} variant={"destructive"}>
        Client Error
      </Button>

      <Button onClick={hanldeApiError} variant={"destructive"}>
        Api Error
      </Button>
      <Button onClick={handleInngestError} variant={"destructive"}>
        Inngest Error
      </Button>
    </div>
  );
};

export default DemoPage;
