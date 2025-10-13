import React from "react";
import * as Sentry from "@sentry/react";

type WithSentryBoundaryProps = {
    dsn: string;
};

export function withSentryBoundary<P>(
    Component: React.ComponentType<P>
) {
    return function WrappedWithSentry(
        props: React.PropsWithChildren<P & WithSentryBoundaryProps>
    ) {
        React.useEffect(() => {
            Sentry.init({
                dsn: props.dsn,
                integrations: [Sentry.browserTracingIntegration()],
                tracesSampleRate: 1.0,
                sendDefaultPii: true,
            });
        }, [props.dsn]);

        const { dsn, ...rest } = props;

        return (
            <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
                <Component {...(rest as React.PropsWithChildren<P>)} />
            </Sentry.ErrorBoundary>
        );
    };
}