"use client";

import MobileFrame from "@/components/Common/MobileFrame";
import MobileViewContent from "@/components/Common/MobileViewContent";
import useWindowSize from "@/hooks/useWindowSize";
import { cn } from "@/libs/utils";
import { AppState } from "@/redux/store";
import { shallowEqual, useSelector } from "react-redux";
import BoxContainer from "../Layouts/BoxContainer";

export default function MobileView() {
  const { profile, links } = useSelector(
    (state: AppState) => ({
      profile: state.user.profile,
      links: state.links.links,
    }),
    shallowEqual,
  );
  const { width } = useWindowSize();

  return (
    <BoxContainer
      className={cn("items-center justify-center py-12", width < 640 && "px-8")}
    >
      <MobileFrame>
        <MobileViewContent
          profileLinks={{
            profile: profile as unknown as UserProfile,
            links,
          }}
          delayCountMax={5}
        />
      </MobileFrame>
    </BoxContainer>
  );
}
