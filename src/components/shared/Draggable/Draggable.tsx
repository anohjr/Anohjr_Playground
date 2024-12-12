import { useDraggable } from "@dnd-kit/core";
import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export interface DraggableItem {
    id: string;
    coordinates: { x: number; y: number; zIndex: number };
    children: React.ReactNode;
    /**
     * Disable draggable
     */
    disabled?: boolean;
}

/**
 * Make a Draggable item
 */
const Draggable = React.memo(({ id, coordinates, children, disabled = false }: DraggableItem) => {
    const { x, y, zIndex } = coordinates;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        position: "absolute" as "absolute",
        left: transform ? x + transform.x : x,
        top: transform ? y + transform.y : y,
        cursor: "grab",
    };

    const eventListeners = disabled ? {} : listeners;

    return (
        <div className={styles["picture-draggable"]} style={{ zIndex }}>
            <div ref={setNodeRef} {...eventListeners} {...attributes} style={style}>
                {children}
            </div>
        </div>
    );
});

export default Draggable;
