/**
 * Determines whether the app is being run in development
 * @returns {boolean} whether we're in the development environment
 */
export function isDev(): boolean {
  return process.env && process.env.NODE_ENV === "development";
}
