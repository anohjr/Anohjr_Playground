import TodaysDate from "./components/TodaysDate";
import styles from "./style.module.scss";
import DesktopAccessDisabledOutlinedIcon from "@mui/icons-material/DesktopAccessDisabledOutlined";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ToggleTheme from "./components/ToggleTheme";
/**
 * Render top desktop menu bar
 */
const MenuBar = () => {
    return (
        <div className={styles["menu-bar"]}>
            <div className={styles["menu-bar-left"]}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DesktopAccessDisabledOutlinedIcon className={styles["desktop-icon"]} />
                    </TooltipTrigger>
                    <TooltipContent>Turn off desk</TooltipContent>
                </Tooltip>
                <span>virtual_desk</span>

                <Button variant="ghost" size="sm">
                    <span>anohjr_github</span>
                </Button>
            </div>
            <div className={styles["menu-bar-right"]}>
                <ToggleTheme />
                <TodaysDate />
            </div>
        </div>
    );
};

export default MenuBar;
