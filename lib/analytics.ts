type AnalyticsValue =
  | string
  | number
  | boolean;

type AnalyticsParameters = Record<
  string,
  AnalyticsValue | undefined
>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: AnalyticsParameters,
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  parameters?: AnalyticsParameters,
) {
  if (
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag(
    "event",
    eventName,
    parameters,
  );
}