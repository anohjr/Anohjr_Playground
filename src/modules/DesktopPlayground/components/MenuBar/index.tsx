import TodaysDate from "./components/TodaysDate";
import styles from "./style.module.scss";
/**
 * Render top desktop menu bar
 */
const MenuBar = () => {
    return (
        <div className={styles["menu-bar"]}>
            <div className={styles["menu-bar-left"]}></div>
            <div className={styles["menu-bar-right"]}>
                <TodaysDate/>
            </div>
        </div>
    );
};
export default MenuBar;
