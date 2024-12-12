import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";
import TypingTitle from "./TypingTitle";
import MenuBar from "./MenuBar";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable from "@/components/shared/Draggable/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { useEffect, useState } from "react";
import { useDraggableMethods } from "@/components/shared/Draggable/useDraggableMethods";
import useInitialItems from "./hooks/useInitialPositions";

const DesktopPlayground = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { initialItems } = useInitialItems({ moodboard_pictures, setIsDialogOpen });

    const { items, handleDragEnd, handleDragStart } = useDraggableMethods(initialItems);

    // Save position into local storage
    useEffect(() => {
        const itemsPos = items.map(({ id, x, y, zIndex }) => ({ id, x, y, zIndex }));
        localStorage.setItem("items-position", JSON.stringify(itemsPos));
    }, [items]);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    return (
        <div className={styles["desktop-playground"]}>
            <MenuBar />
            <TypingTitle>Hello ! Welcome to my playground</TypingTitle>

            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={sensors}
                modifiers={[restrictToWindowEdges]}
            >
                {items.map(({ id, x, y, zIndex, children }) => (
                    <Draggable
                        key={`draggable-item-${id}`}
                        id={id}
                        coordinates={{ x, y, zIndex }}
                        disabled={isDialogOpen}
                    >
                        {children}
                    </Draggable>
                ))}
            </DndContext>
        </div>
    );
};

export default DesktopPlayground;
