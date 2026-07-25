process.env.NODE_ENV = "test";
// @ts-expect-error React 19 act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import "@testing-library/jest-dom/vitest";
