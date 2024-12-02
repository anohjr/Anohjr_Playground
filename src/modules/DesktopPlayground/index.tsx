import MoodBoardPicture from "./MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";
import TypingTitle from "./TypingTitle";
import MenuBar from "./MenuBar";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable from "@/components/shared/Draggable/Draggable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import classNames from "classnames";
import useDraggableMethods from "@/components/shared/Draggable/useDraggableMethods";

const DesktopPlayground = () => {
    const initialItems = moodboard_pictures.map((img, index) => ({
        id: `picture-${img.id}`,
        x: 150 + index * 220,
        y: 150,
        children: <MoodBoardPicture img={img} key={img.id} />,
    }));

    const { items, activeImgId, handleDragEnd, handleDragStart } = useDraggableMethods(initialItems);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    return (
        <div className={styles["desktop-playground"]}>
            <MenuBar />
            <TypingTitle>Hello ! Welcome to my playground</TypingTitle>

            <DndContext
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
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
                            <Draggable id={item.id} x={item.x} y={item.y}>
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
