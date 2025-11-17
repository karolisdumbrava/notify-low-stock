import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <s-page>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <s-banner tone="critical">
            <h2>Oops! Something went wrong</h2>
            <p>
              {error.status} - {error.statusText}
            </p>
            <s-button onClick={() => window.location.reload()}>
              Reload Page
            </s-button>
          </s-banner>
        </div>
      </s-page>
    );
  }

  return (
    <s-page>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <s-banner tone="critical">
          <h2>Unexpected Error</h2>
          <p>We encountered an unexpected error. Please try again.</p>
          <s-button onClick={() => window.location.reload()}>
            Reload Page
          </s-button>
        </s-banner>
      </div>
    </s-page>
  );
}
