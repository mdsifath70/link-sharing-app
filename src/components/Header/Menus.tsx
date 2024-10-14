"use client";

import { Button } from "@/components/ui/button";
import { globalActions } from "@/redux/features/global/globalSlice";
import { AppState } from "@/redux/store";
import { Link as LinkIcon, UserCircle2 } from "lucide-react";
import { FC, SVGProps } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Tab {
  tabName: MenuTabNames;
  name: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

const tabs: Tab[] = [
  {
    tabName: "links",
    name: "Links",
    Icon: LinkIcon,
  },
  {
    tabName: "profileDetails",
    name: "Profile Details",
    Icon: UserCircle2,
  },
];

export default function Menus() {
  const { activeMenuTab } = useSelector((state: AppState) => state.global);
  const dispatch = useDispatch();

  const handleActiveMenu = (tabName: MenuTabNames) => {
    dispatch(globalActions.setActiveMenuTab(tabName));
  };

  return (
    <ul className="flex items-center lg:gap-4">
      {tabs.map(({ tabName, name, Icon }) => {
        return (
          <li key={tabName}>
            <Button
              variant={tabName === activeMenuTab ? "secondary" : "ghost"}
              size="lg"
              iconLeft={<Icon className="h-5 w-5" />}
              onClick={() => handleActiveMenu(tabName)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <span className="hidden md:inline-block">{name}</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
