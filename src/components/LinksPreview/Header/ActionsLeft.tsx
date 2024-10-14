"use client";

import Logo from "@/components/Common/Logo";
import Loader from "@/components/Loaders/Loader";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import useProfileLinksData from "@/hooks/data/useProfileLinksData";
import Link from "next/link";

export default function ActionsLeft() {
  const { isLoadingUser, user } = useUser();
  const { data: profileLinksData, isLoading } = useProfileLinksData();
  const { profile } = profileLinksData?.payload || {};

  const isLoggedInSameUser = user?.id === profile?.id;

  return (
    <div>
      {isLoading || isLoadingUser ? (
        <Loader variant="onlySpinner" />
      ) : user ? (
        <Link href="/">
          <Button variant="outline" size="lg">
            {isLoggedInSameUser ? "Back to Editor" : "Back to your profile"}
          </Button>
        </Link>
      ) : (
        <Logo />
      )}
    </div>
  );
}
