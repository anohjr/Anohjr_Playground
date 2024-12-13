import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

interface IResetItemsPos {
    onClick: () => void;
}
const ResetItemsPos = ({ onClick }: IResetItemsPos) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onClick}>
                    <RestartAltOutlinedIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent>Reset desk</TooltipContent>
        </Tooltip>
    );
};

export default ResetItemsPos;
