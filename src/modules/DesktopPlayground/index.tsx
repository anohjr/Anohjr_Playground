import styles from "./style.module.scss";
import { moodboard_pictures } from "./utils";

const DesktopPlayground = () => {
    return (
        <div className={styles["desktop-playground"]}>
            <h1 className={styles["main-title"]}>Naomi_Rose_</h1>
            
            {/** My moodboard pictures */}
            <div className={styles["moodboard-container"]}>
                <div className={styles["moodboard-pictures"]}>
                    {moodboard_pictures.map((img) => (
                        <img key={img.id} src={img.src} alt={img.alt} />
                    ))}
                </div>
            </div>

            <div className="menu"></div>
        </div>
    );
};

export default DesktopPlayground;
