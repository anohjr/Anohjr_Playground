import TodaysDate from "./TodaysDate";
import styles from "./style.module.scss";
import DesktopAccessDisabledOutlinedIcon from "@mui/icons-material/DesktopAccessDisabledOutlined";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ToggleTheme from "./ToggleTheme";
import ResetItemsPos from "./ResetItemsPos";

interface IMenuBar {
    /**
     * Handle reset desk initial items position
     */
    handleResetDesk: () => void;
}
/**
 * Render top desktop menu bar
 */
const MenuBar = ({ handleResetDesk }: IMenuBar) => {
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
                <ResetItemsPos onClick={() => handleResetDesk()} />
                <TodaysDate />
            </div>
        </div>
    );
};

export default MenuBar;
