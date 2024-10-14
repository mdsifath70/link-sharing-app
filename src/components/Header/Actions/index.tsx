"use client";

import Loader from "@/components/Loaders/Loader";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import { Eye } from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";

export default function Actions() {
  const { user } = useUser();

  const { username } = user || {};

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {username ? (
        <Link href={`/links/${username}`}>
          <Button variant="outline" size="lg" className="px-4 md:px-6">
            <span className="hidden md:inline-block">Preview</span>
            <span className="md:hidden">
              <Eye className="h-4 w-4" />
            </span>
          </Button>
        </Link>
      ) : (
        <Loader variant="onlySpinner" />
      )}
      <Logout />
    </div>
  );
}
