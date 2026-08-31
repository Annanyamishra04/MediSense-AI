// Never hardcode a production URL here. In development, Create React App's
// dev server proxies /api to the backend (see package.json "proxy" or
// REACT_APP_API_URL below). In production, set REACT_APP_API_URL to the
// deployed backend's URL as an environment variable at build time.
export const API_BASE_URL = process.env.REACT_APP_API_URL || "";
