"use client";

import Loader from "@/components/Loaders/Loader";
import { useLinksQuery } from "@/redux/features/links/linksApiSlice";
import { linksActions } from "@/redux/features/links/linksSlice";
import { AppState } from "@/redux/store";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkItem from "./LinkItem";

export default function Links() {
  const { links } = useSelector((state: AppState) => state.links);
  const dispatch = useDispatch();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { data: linksData, isLoading: isLoadingLinks } = useLinksQuery();

  // set data
  useEffect(() => {
    const linksPayload = linksData?.payload;
    if (!isLoadingLinks && linksPayload?.length) {
      dispatch(linksActions.setLinks(linksPayload));
      setIsLoadingData(false);
    } else if (!isLoadingLinks && !linksPayload?.length) {
      setIsLoadingData(false);
    }
  }, [dispatch, isLoadingLinks, linksData?.payload]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      const originalPosIndex = links.findIndex((link) => link.id === active.id);
      const newPosIndex = links.findIndex((link) => link.id === over.id);
      const newLinks = arrayMove(links, originalPosIndex, newPosIndex);

      dispatch(linksActions.setLinks(newLinks));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div>
      {isLoadingData ? (
        <div>
          <Loader />
        </div>
      ) : links?.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed bg-gray-50 p-10 text-center">
          <h2 className="mb-2 text-xl font-semibold text-dark">
            No link added yet
          </h2>
          <p>Click the top &quot;Add new link&quot; button to get started!</p>
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCorners}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={links} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {links.map((linkItem, index) => {
                return (
                  <motion.div
                    key={linkItem.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "tween",
                      delay: index < 5 ? index * 0.1 : 0,
                    }}
                  >
                    <LinkItem index={index} linkItem={linkItem} />
                  </motion.div>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
