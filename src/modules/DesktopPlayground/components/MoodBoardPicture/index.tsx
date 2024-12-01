import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { MoodboardPicture } from "../../utils";
import { Upload } from "@mynaui/icons-react";
import styles from "./style.module.scss";
import { Button } from "@/components/ui/button";
import { Save } from "@mynaui/icons-react";
import { useTranslation } from "react-i18next";

interface IMoodBoardPicture {
    /**
     * Image data
     */
    img: MoodboardPicture;
}

/**
 * Render image picture + related actions
 */
const MoodBoardPicture = ({ img }: IMoodBoardPicture) => {
    const [t] = useTranslation();
    const { src, alt } = img;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <img src={src} alt={alt} className={styles["picture"]} />
            </DialogTrigger>

            <DialogContent className={styles["picture-modal"]}>
                <DialogTitle style={{ display: "none" }} />
                <img src={src} alt={alt} />
                <div className={styles["action-btn-container"]}>
                    <Button variant="outline" className={styles["action-btn"]} title={t("virtual_desk.upload")}>
                        <Upload color="var(--background)" />
                    </Button>
                    <Button variant="outline" className={styles["action-btn"]} title={t("virtual_desk.download")}>
                        <Save color="var(--background)" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MoodBoardPicture;
