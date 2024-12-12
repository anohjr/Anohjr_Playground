import MoodBoardPicture from "./MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures, MoodboardPicture, PictureItem } from "./utils";
import TypingTitle from "./TypingTitle";
import MenuBar from "./MenuBar";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable from "@/components/shared/Draggable/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import classNames from "classnames";
import useDraggableMethods from "@/components/shared/Draggable/useDraggableMethods";
import { useEffect, useMemo, useState } from "react";
import { getJsonOrFalse } from "@/shared/helpers/utils";

const DesktopPlayground = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const gap = 10;
    const imageSize = 120;
    const columns = 2;
    const rows = 2;

    const storedItemsPos = getJsonOrFalse(localStorage.getItem("items-position"));

    const initialItems = useMemo((): PictureItem[] => {
        const menuBarHeight = window.innerHeight * 0.25;

        const gridWidth = columns * imageSize + (columns - 1) * gap;
        const gridHeight = rows * imageSize + (rows - 1) * gap;

        const startX = (window.innerWidth - gridWidth) / 2;
        const startY = (window.innerHeight - gridHeight) / 2 - menuBarHeight / 2;

        if (storedItemsPos) {
            return storedItemsPos.map((item) => {
                const img = moodboard_pictures.find((pic) => pic.id === item.id) as MoodboardPicture;
                const children = <MoodBoardPicture img={img} key={img.id} setIsDialogOpen={setIsDialogOpen} />;
                return { ...item, children };
            });
        }

        return moodboard_pictures.map((img, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;

            return {
                id: img.id,
                x: startX + col * (imageSize + gap),
                y: startY + row * (imageSize + gap),
                children: <MoodBoardPicture img={img} key={img.id} setIsDialogOpen={setIsDialogOpen} />,
                zIndex: 1,
            };
        });
    }, []);

    const { items, handleDragEnd, handleDragStart } = useDraggableMethods(initialItems);

    useEffect(() => {
        // Save position into local storage
        const itemsPos = items.map((item) => {
            const { id, x, y, zIndex } = item;
            return { id, x, y, zIndex };
        });
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
                {items.map((item) => {
                    const { zIndex } = item;
                    return (
                        <div
                            key={item.id}
                            className={classNames({
                                [styles["picture-draggable"]]: true,
                            })}
                            style={{ zIndex }}
                        >
                            <Draggable id={item.id} x={item.x} y={item.y} disabled={isDialogOpen}>
                                {item.children}
                            </Draggable>
                        </div>
                    );
                })}
            </DndContext>
        </div>
    );
};

export default DesktopPlayground;
