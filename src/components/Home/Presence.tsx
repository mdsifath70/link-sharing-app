"use client";

import { AppState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import CustomizeLinks from "./CustomizeLinks";
import ProfileDetails from "./ProfileDetails";

export default function Presence() {
  const { activeMenuTab } = useSelector((state: AppState) => state.global);

  const content = () => {
    switch (activeMenuTab) {
      case "links":
        return <CustomizeLinks />;
      case "profileDetails":
        return <ProfileDetails />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeMenuTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "tween" }}
        className="overflow-hidden"
      >
        {content()}
      </motion.div>
    </AnimatePresence>
  );
}
