import MoodBoardPicture from "./MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";
import TypingTitle from "./TypingTitle";
import MenuBar from "./MenuBar";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable from "@/components/shared/Draggable/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import classNames from "classnames";
import useDraggableMethods from "@/components/shared/Draggable/useDraggableMethods";
import { useState } from "react";

const DesktopPlayground = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const gap = 10;
    const imageSize = 120;
    const columns = 2;
    const rows = 2;
    const menuBarHeight = window.innerHeight * 0.25;

    const gridWidth = columns * imageSize + (columns - 1) * gap;
    const gridHeight = rows * imageSize + (rows - 1) * gap;

    const startX = (window.innerWidth - gridWidth) / 2;
    const startY = (window.innerHeight - gridHeight) / 2 - menuBarHeight / 2;

    const initialItems = moodboard_pictures.map((img, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        return {
            id: `picture-${img.id}`,
            x: startX + col * (imageSize + gap),
            y: startY + row * (imageSize + gap),
            children: <MoodBoardPicture img={img} key={img.id} setIsDialogOpen={setIsDialogOpen} />,
        };
    });

    const { items, activeImgId, handleDragEnd, handleDragStart } = useDraggableMethods(initialItems);

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
                    const isActive = activeImgId === item.id; // dragging img
                    return (
                        <div
                            key={item.id}
                            className={classNames({
                                [styles["picture-draggable"]]: true,
                                [styles["active"]]: isActive,
                            })}
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
