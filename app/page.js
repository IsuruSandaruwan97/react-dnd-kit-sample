/** @format */

"use client";
import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Section from "./components/Section";

const sections = [
  { id: 1, title: "Section 01" },
  { id: 2, title: "Section 02" },
  { id: 3, title: "Section 03" },
  { id: 4, title: "Section 04" },
  { id: 5, title: "Section 05" },
];

const DraggableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    margin: 10,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
};

export default function Home() {
  const [items, setItems] = useState(sections?.map((section) => section.id));

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <DraggableItem
            key={item}
            id={item}
            content={
              <Section
                title={sections?.find((section) => section.id === item)?.title}
              />
            }
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
