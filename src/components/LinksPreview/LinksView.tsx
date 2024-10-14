"use client";

import useProfileLinksData from "@/hooks/data/useProfileLinksData";
import { notFound } from "next/navigation";
import Container from "../Common/Container";
import MobileViewContent from "../Common/MobileViewContent";

export default function LinksView() {
  const {
    data: profileLinksData,
    isLoading,
    isFetching,
  } = useProfileLinksData();
  const profileLinks = profileLinksData?.payload;

  if (!isLoading && !profileLinks) {
    return notFound();
  }

  return (
    <Container>
      <div className="pb-10">
        <div className="xxsm:px-6 mx-auto mt-10 max-w-sm rounded-3xl px-4 pb-8 pt-px sm:px-8 sm:pb-10 sm:pt-2 md:-mt-32 md:bg-white md:shadow-xl">
          <MobileViewContent
            profileLinks={profileLinks!}
            isFetching={isFetching}
          />
        </div>
      </div>
    </Container>
  );
}
