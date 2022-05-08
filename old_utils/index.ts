import Logger from "./logger";

export default {
	/**
	 * @type {Logger} Default logger object
	 */
	Logger,
};

export {
	/**
	 * @type {Logger} Explicit logger object
	 */
	Logger,
};

export interface LoggerOptions {
	/**
	 * Discord webhook URL
	 * ```js
	 * webhook: "https://discord.com/api/webhooks/id/token"
	 * ```
	 * See [Discord webhooks documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for more information.
	 */
	webhook: string;
}

export interface RequestOptions {
	/**
	 * Message to pass to log
	 * ```js
	 * message: "This is an error message"
	 * ```
	 */
	message: string;
	/**
	 * Type of log (ERROR, WARN, DEBUG, INFO, CUSTOM).  The type field will be ignored unless logger.custom(...) is used.
	 * ```js
	 * type: "CUSTOM TYPE"
	 * ```
	 */
	type?: string;
	/**
	 * Uses decimal format.  Color can only be defined when logger.custom(...) is used
	 * ```js
	 * color: 15252531
	 * ```
	 */
	color?: number;
	/**
	 * Optional title to include in log
	 * ```js
	 * title: "An error has occured!"
	 * ```
	 */
	json?: Record<string, unknown> | undefined;
	/**
	 * Optional error stack to display in log
	 * ```js
	 * error: Error("Error message") // Custom error is valid
	 *
	 * error: err // Error callback is valid
	 * ```
	 */
	error?: Error;
}
