"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ShareLink() {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(location.href);
    setIsCopied(true);
  };

  // reset copy
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <Button size="lg" onClick={handleClick}>
      {isCopied ? "Link Copied" : "Share Link"}
    </Button>
  );
}
