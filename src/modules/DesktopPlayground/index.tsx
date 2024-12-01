import { useEffect, useState } from "react";
import MoodBoardPicture from "./MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";

const DesktopPlayground = () => {
    const text = "Anohjr's Playground_";
    const speed = 100;

    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return (
        <div className={styles["desktop-playground"]}>
            <h1 className={styles["main-title"]}>{displayedText}</h1>

            {/** My moodboard pictures */}
            <div className={styles["moodboard-container"]}>
                <div className={styles["moodboard-pictures"]}>
                    {moodboard_pictures.map((img) => (
                        <MoodBoardPicture img={img} key={img.id} />
                    ))}
                </div>
            </div>

            <div className="menu"></div>
        </div>
    );
};

export default DesktopPlayground;
