import { useEffect, useState } from "react";
import MoodBoardPicture from "./MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";
import TypingTitle from "./TypingTitle";

const DesktopPlayground = () => {


    return (
        <div className={styles["desktop-playground"]}>
            <TypingTitle>Anohjr's Virtual Desk</TypingTitle>
            
            <div className={styles["moodboard-container"]}>
                <div className={styles["moodboard-pictures"]}>
                    {moodboard_pictures.map((img) => (
                        <MoodBoardPicture img={img} key={img.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DesktopPlayground;
