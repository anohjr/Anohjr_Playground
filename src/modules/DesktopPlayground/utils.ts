import cat_look from "/assets/img/cat_look.png";
import anime_girl from "/assets/img/anime_girl.png";
import artic_fox from "/assets/img/artic_fox.png";
import ectoplasma from "/assets/img/ectoplasma.png";
import { ReactNode } from "react";

export type MoodboardPictureTypes = "cat_look" | "anime_girl" | "artic_fox" | "ectoplasma";
export type MoodboardPicture = { id: MoodboardPictureTypes; src: string; alt: string };

export const moodboard_pictures: MoodboardPicture[] = [
    { id: "cat_look", src: cat_look, alt: "Cute cat looking at you with big rounded eyes" },
    { id: "anime_girl", src: anime_girl, alt: "Anime girl" },
    { id: "artic_fox", src: artic_fox, alt: "Artic fox. Anohjr's github profile picture" },
    { id: "ectoplasma", src: ectoplasma, alt: "Ectoplasma sitting on stairs" },
];

/**
 * Draggable item
 */
export interface PictureItem {
    id: string;
    /**
     * position x of the picture
     */
    x: number;
     /**
     * position y of the picture
     */
    y: number;
    /**
     * Rendered component
     */
    children: ReactNode;
    /**
     * Picture z-index
     */
    zIndex: number;
}
