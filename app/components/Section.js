/** @format */
import Item from "./Item";
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
const sectionPayload = [
  { id: 1, title: "Title 01" },
  { id: 2, title: "Title 02" },
  { id: 3, title: "Title 03" },
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

const Section = ({ title }) => {
  const [items, setItems] = useState(sectionPayload?.map((data) => data.id));

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
    <div style={{ border: "1px dotted white", padding: "1em" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5em" }}>{title}</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items?.map((item) => {
            return (
              <DraggableItem
                key={item}
                id={item}
                content={
                  <div
                    style={{
                      border: "1px dotted white",
                      padding: "1em",
                      margin: "2em",
                    }}
                  >
                    <Item
                      key={item}
                      title={
                        sectionPayload?.find((payload) => payload.id === item)
                          ?.title
                      }
                      items={[
                        { label: "Description 1", value: "value 1" },
                        { label: "Description 2", value: "value 2" },
                      ]}
                    />
                  </div>
                }
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Section;
