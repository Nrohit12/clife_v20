import { useIdleTimer } from "react-idle-timer";

export type IdleTimerContainerProps = {
    idleTimeout: number; // in ms
    idleThrottle: number; // in ms
    mockLoginRedirectTimeout: number; // in ms
    redirectCall: () => void;
};

const IdleTimerContainer = ({ idleTimeout, idleThrottle, mockLoginRedirectTimeout, redirectCall }: IdleTimerContainerProps) => {

    const onIdle = () => {

        // To avoid navigating back to dashboard until auth context is cleared so kept timeout
        setTimeout(() => {
            redirectCall && redirectCall();
        }, mockLoginRedirectTimeout || 500);
    };

    useIdleTimer({
        timeout: idleTimeout || 60000 * 5, // default to 5 minutes
        onIdle,
        onActive: () => { },
        onAction: () => { },
        throttle: idleThrottle || 60000, // default to 1 minute
        events: ["mousemove", "keydown", "mousedown", "touchstart"], // custom events
        crossTab: true, // detect activity across tabs
    });

    return null;
};

export default IdleTimerContainer;
