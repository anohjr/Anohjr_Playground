import { useDraggable } from "@dnd-kit/core";
import React from "react";

export interface DraggableItem {
    id: string;
    x: number;
    y: number;
    children: React.ReactNode;
}
/**
 * Make a Draggable item
 */
const Draggable = ({ id, x, y, children }: DraggableItem) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = {
        position: "absolute" as "absolute",
        left: transform ? x + transform.x : x,
        top: transform ? y + transform.y : y,
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
            {children}
        </div>
    );
};

export default Draggable;
