import MoodBoardPicture from "./components/MoodBoardPicture";
import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";
import TypingTitle from "./components/TypingTitle";
import MenuBar from "./components/MenuBar";

const DesktopPlayground = () => {
    return (
        <div className={styles["desktop-playground"]}>
            <MenuBar />
            <div className={styles["playground-body"]}>
                <TypingTitle>Anohjr's Virtual Desk</TypingTitle>

                <div className={styles["moodboard-container"]}>
                    <div className={styles["moodboard-pictures"]}>
                        {moodboard_pictures.map((img) => (
                            <MoodBoardPicture img={img} key={img.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopPlayground;
