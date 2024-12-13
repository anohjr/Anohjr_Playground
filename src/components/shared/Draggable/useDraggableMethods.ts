import { ReactNode, useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";
import { DraggableItemData } from "@/modules/DesktopPlayground/utils";

// Draggable methods
export const useDraggableMethods = (initialItems: DraggableItemData[], defaultItemsPos: DraggableItemData[]) => {
    const [items, setItems] = useState<DraggableItemData[]>(initialItems);

    // When screen resize, make sure the image doesn't go out of the screen
    const handleResize = useCallback(() => {
        const { innerWidth, innerHeight } = window;
        setItems((prevItems) =>
            prevItems.map((item) => {
                const newX = Math.min(item.x, innerWidth - 120);
                const newY = Math.min(item.y, innerHeight - 120);

                if (item.x === newX && item.y === newY) return item;
                return { ...item, x: newX, y: newY };
            })
        );
    }, []);

    useEffect(() => {
        const throttledResize = throttle(handleResize, 100); // Limit resize calls to once every 100ms
        window.addEventListener("resize", throttledResize);
        return () => {
            window.removeEventListener("resize", throttledResize);
        };
    }, [handleResize]);

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

    const handleDragEnd = useCallback((event: any) => {
        const { active, delta } = event;
        const id = active.id;

        const { innerWidth, innerHeight } = window;
        const itemSize = 120;

        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== id) return item;

                const newX = Math.min(Math.max(item.x + delta.x, 0), innerWidth - itemSize);
                const newY = Math.min(Math.max(item.y + delta.y, 0), innerHeight - itemSize);

                if (item.x === newX && item.y === newY) return item;

                return { ...item, x: newX, y: newY };
            })
        );
    }, []);

    const handleDragStart = useCallback((event: any) => {
        const { id: imageId } = event.active;

        setItems((prev) => {
            const updatedItems = prev.map((item) => {
                if (item.id === imageId) {
                    return { ...item, zIndex: prev.length };
                }
                return { ...item, zIndex: item.zIndex > 0 ? item.zIndex - 1 : 0 };
            });
            return updatedItems;
        });
    }, []);

    const handleResetInitialPos = () => {
        localStorage.removeItem("items-position");
        const defaultItems = defaultItemsPos.map((defItem) => {
            const children = items.find((item) => item.id === defItem.id)?.children as ReactNode;
            return { ...defItem, children };
        });
        setItems(defaultItems);
    };

    return {
        items,
        handleDragEnd,
        handleDragStart,
        handleResetInitialPos,
    };
};
