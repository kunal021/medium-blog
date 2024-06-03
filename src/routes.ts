/**
 * An array of routes that are accessable to public
 * These route do not requires authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These route redirects user to /settings
 * @type {string[]}
 */
export const authenticationRoutes = ["/signin", "/signup", "/api/user/create"];

/**
 * The prefix authentication route
 * Routes that start with this prefix are used for authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after signin
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
