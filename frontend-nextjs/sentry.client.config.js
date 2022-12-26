import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://5dc7796522234a74902be3927b9b605b@o1039828.ingest.sentry.io/4504392318124032",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.5,
});
