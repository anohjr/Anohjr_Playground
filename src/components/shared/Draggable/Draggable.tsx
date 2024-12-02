import { useDraggable } from "@dnd-kit/core";
import React from "react";

export interface DraggableItem {
    id: string;
    x: number;
    y: number;
    children: React.ReactNode;
    /**
     * Disable draggable
     */
    disabled?: boolean;
}

/**
 * Make a Draggable item
 */
const Draggable = ({ id, x, y, children, disabled = false }: DraggableItem) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        position: "absolute" as "absolute",
        left: transform ? x + transform.x : x,
        top: transform ? y + transform.y : y,
        cursor: "grab",
    };

    const eventListeners = disabled ? {} : listeners;

    return (
        <div ref={setNodeRef} {...eventListeners} {...attributes} style={style}>
            {children}
        </div>
    );
};

export default Draggable;
