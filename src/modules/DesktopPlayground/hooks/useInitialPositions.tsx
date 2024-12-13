import { getJsonOrFalse } from "@/shared/helpers/utils";
import { SetStateAction, useMemo } from "react";
import MoodBoardPicture from "../MoodBoardPicture";
import { DraggableItemData, MoodboardPicture } from "../utils";

interface InitialItemsProps {
    moodboard_pictures: MoodboardPicture[];
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
    columns?: number;
    rows?: number;
    imageSize?: number;
    gap?: number;
}
const useInitialItems = ({
    moodboard_pictures,
    setIsDialogOpen,
    columns = 2,
    rows = 2,
    imageSize = 120,
    gap = 10,
}: InitialItemsProps) => {
    const storedItemsPos = getJsonOrFalse(localStorage.getItem("items-position"));

    const defaultItems: DraggableItemData[] = [];
    const defaultItemsPos: DraggableItemData[] = [];

    const initialItems = useMemo(() => {
        const menuBarHeight = window.innerHeight * 0.25;

        const gridWidth = columns * imageSize + (columns - 1) * gap;
        const gridHeight = rows * imageSize + (rows - 1) * gap;

        const startX = (window.innerWidth - gridWidth) / 2;
        const startY = (window.innerHeight - gridHeight) / 2 - menuBarHeight / 2;

        moodboard_pictures.forEach((img, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;

            const defaultPos = {
                id: img.id,
                x: startX + col * (imageSize + gap),
                y: startY + row * (imageSize + gap),
                zIndex: 1,
            };
            const defaultItem = {
                ...defaultPos,
                children: <MoodBoardPicture img={img} key={img.id} setIsDialogOpen={setIsDialogOpen} />,
            };
            defaultItemsPos.push(defaultPos);
            defaultItems.push(defaultItem);
        });

        if (storedItemsPos) {
            return storedItemsPos
                .map((item) => {
                    const img = moodboard_pictures.find((pic) => pic.id === item.id);
                    if (!img) return null;
                    const children = <MoodBoardPicture img={img} key={img.id} setIsDialogOpen={setIsDialogOpen} />;
                    return { ...item, children };
                })
                .filter(Boolean);
        }
        return defaultItems;
    }, [storedItemsPos]);

    return { initialItems, defaultItemsPos };
};

export default useInitialItems;
