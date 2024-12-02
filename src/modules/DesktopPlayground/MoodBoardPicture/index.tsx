import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { MoodboardPicture } from "../utils";
import styles from "./style.module.scss";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { SetStateAction } from "react";
interface IMoodBoardPicture {
    /**
     * Image data
     */
    img: MoodboardPicture;
    /**
     * Save dialog open state
     */
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

/**
 * Render image picture + related actions
 */
const MoodBoardPicture = ({ img, setIsDialogOpen }: IMoodBoardPicture) => {
    const [t] = useTranslation();
    const { src, alt } = img;

    const handleClick = () => {
        setIsDialogOpen(true);
    }

    return (
        <Dialog onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <img src={src} alt={alt} className={styles["picture"]} onClick={handleClick}/>
            </DialogTrigger>

            <DialogContent className={styles["picture-modal"]}>
                <DialogTitle style={{ display: "none" }} />
                <img src={src} alt={alt} />
                <div className={styles["action-btn-container"]}>
                    <Button
                        variant="outline"
                        size="icon"
                        className={styles["action-btn"]}
                        title={t("virtual_desk.upload")}
                    >
                        <UploadFileOutlinedIcon />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className={styles["action-btn"]}
                        title={t("virtual_desk.download")}
                    >
                        <FileDownloadOutlinedIcon />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MoodBoardPicture;
