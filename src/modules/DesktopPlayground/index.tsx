import MoodBoardPicture from "./MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";
import TypingTitle from "./TypingTitle";
import MenuBar from "./MenuBar";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Draggable, { DraggableItem } from "@/components/shared/Draggable";
import { useState } from "react";

const DesktopPlayground = () => {
    const [items, setItems] = useState<DraggableItem[]>([
        { id: "1", x: 100, y: 100, children: <TypingTitle>Hello ! Welcome to my playground</TypingTitle> },
        // { id: "2", x: 200, y: 200, children: <div style={circleStyle}>Circle</div> },
        ...moodboard_pictures.map((img, index) => ({
            id: `picture-${index}`,
            x: 150 + index * 50, // position initiale, vous pouvez ajuster
            y: 150,
            children: <MoodBoardPicture img={img} key={img.id} />,
        })),
    ]);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    const handleDragEnd = (event: any) => {
        const { active, delta } = event;
        const id = active.id;

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          x: item.x + delta.x,
                          y: item.y + delta.y,
                      }
                    : item
            )
        );
    };

    return (
        <div className={styles["desktop-playground"]}>
            <MenuBar />
            <div className={styles["playground-body"]}>
                <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    {items.map((item) => (
                        <div onClick={() => console.log("click")} key={item.id}>
                            <Draggable id={item.id} x={item.x} y={item.y}>
                                {item.children}
                            </Draggable>
                        </div>
                    ))}
                    {/* <div className={styles["moodboard-container"]}>
                        <div className={styles["moodboard-pictures"]}>
                            {moodboard_pictures.map((img) => (
                                <MoodBoardPicture img={img} />
                            ))}
                        </div>
                    </div> */}
                </DndContext>
            </div>
        </div>
    );
};

export default DesktopPlayground;
