import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface AppTooltipProps {
    content: string;
    // children: React.ReactElement;
    children: React.ReactElement;
    placement?: "top" | "right" | "bottom" | "left";
}

const AppTooltip = ({
    content,
    children,
    placement = "top",
}: AppTooltipProps) => {
    return (
        <OverlayTrigger
            placement={placement}
            overlay={<Tooltip id="app-tooltip">{content}</Tooltip>}
            trigger={["hover", "focus"]}
            delay={{ show: 200, hide: 100 }}
        >
            {children}
        </OverlayTrigger>
    );
};

export default AppTooltip;
