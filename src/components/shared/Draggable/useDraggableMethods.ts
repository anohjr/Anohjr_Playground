import { useEffect, useState } from "react";
import { DraggableItem } from "./Draggable";

// Draggable methods
const useDraggableMethods = (initialItems: DraggableItem[]) => {
    const [items, setItems] = useState(initialItems);
    const [activeImgId, setActiveImgId] = useState<string | null>(null);

    // When screen resize, make sure the image doesn't go out of the screen
    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;

            setItems((prevItems) =>
                prevItems.map((item) => ({
                    ...item,
                    x: Math.min(item.x, innerWidth - 120),
                    y: Math.min(item.y, innerHeight - 120),
                }))
            );
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleDragEnd = (event: any) => {
        const { active, delta } = event;
        const id = active.id;

        const { innerWidth, innerHeight } = window;
        const itemSize = 120;

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          x: Math.min(Math.max(item.x + delta.x, 0), innerWidth - itemSize),
                          y: Math.min(Math.max(item.y + delta.y, 0), innerHeight - itemSize),
                      }
                    : item
            )
        );
    };

    const handleDragStart = (event: any) => {
        setActiveImgId(event.active.id);
    };

    return {
        items,
        activeImgId,
        handleDragEnd,
        handleDragStart,
    };
};

export default useDraggableMethods;
