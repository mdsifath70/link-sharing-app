"use client";

import { Button } from "@/components/ui/button";
import { linksActions } from "@/redux/features/links/linksSlice";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AddNewLink() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(linksActions.addNewLink({ platformName: "github", url: "" }));
  };

  return (
    <Button
      variant="outline"
      size="lg"
      iconLeft={<Plus className="-mr-1 h-4 w-4" />}
      isFullWidth
      onClick={handleClick}
    >
      Add new link
    </Button>
  );
}
