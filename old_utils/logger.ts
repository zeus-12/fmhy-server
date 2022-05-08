import { LoggerOptions, RequestOptions } from "./index.js";

/**
 * Logger object
 */
export default class Logger {
	/** @type {string} Discord webhook URL */
	private webhook: string;

	/** @type {string} Name of the application */
	private name?: string;

	/** @type {string | null} Application icon URL string */
	private icon?: string | null;

	/**
	 * Construct the Logger class
	 * @typedef {Object} LoggerOptions
	 * @param {string} options.webhook The Discord webhook URL
	 */
	constructor(options: LoggerOptions) {
		this.webhook = options.webhook;
		this.name = "Guide Log";
		this.icon = "https://fmhy.cf/assets/logo.png";

		// Test if webhook and icon links are valid urls
		if (this.webhook) {
			try {
				new URL(this.webhook);
			} catch (err) {
				throw new Error("Webhook is not a valid url");
			}
		}
	}

	/**
	 * Send a POST request to webhook using specified options
	 * @param {RequestOptions} options Request options
	 */
	private async sendReq(options: RequestOptions): Promise<void> {
		fetch(this.webhook, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: this.name,
				avatar_url: this.icon,
				embeds: [
					{
						color: options.color,
						title: options.type,
						description: await this.descriptionBuilder(options),
					},
				],
			}),
		});
	}

	/**
	 * Build the log description: include message, json, and error stack
	 * @param options Request options
	 * @returns Description string
	 */
	private async descriptionBuilder(options: RequestOptions): Promise<string> {
		return `
            ${`\`\`\`ansi\n${options.message}\`\`\``}
            `;
	}

	/**
	 * @typedef {Object} RequestOptions
	 * @param {string} message Message to pass to log
	 * @param {string} [type] Log level (removed, added)
	 * @param {number} [color] Color defined by log level
	 * @param {string} [title] Optional title to include in log
	 * @param {Error} [error] Optional error object to include in log
	 */

	/** @type {RequestOptions} options - Request options */
	async removed(options: RequestOptions): Promise<void> {
		options.type = "Removed";
		options.color = 15158332;
		await this.sendReq(options);
	}

	/** @type {RequestOptions} options - Request options */
	async added(options: RequestOptions): Promise<void> {
		options.type = "Added";
		options.color = 3447003;
		await this.sendReq(options);
	}
}
