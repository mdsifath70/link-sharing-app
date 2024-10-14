"use client";

import { Button } from "@/components/ui/button";
import { authActions } from "@/redux/features/auth/authSlice";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(authActions.logout());
    }
  };

  return (
    <Button
      variant="destructive-outline"
      size="icon"
      title="Logout"
      onClick={handleLogout}
      disabled={isLoading}
      isLoading={isLoading}
      className="xxsm:inline-flex hidden"
    >
      <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
    </Button>
  );
}
