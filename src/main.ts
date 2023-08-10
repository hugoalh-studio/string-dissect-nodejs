import ansiRegExpOriginal from "ansi-regex";
import characterRegExpOriginal from "char-regex";
import emojiRegExpOriginal from "emoji-regex";
import urlRegExpOriginal from "url-regex-safe";
const ansiRegExp = new RegExp(ansiRegExpOriginal().source, "u");
const characterRegExp = new RegExp(characterRegExpOriginal().source, "u");
const emojiRegExp = new RegExp(emojiRegExpOriginal().source, "u");
const urlRegExp = new RegExp(urlRegExpOriginal().source, "u");
const wordRegExp = /[\d\w]+(?:[~@#$%&*_'.-][\d\w]+)*/u;
export interface StringDissectorOptions {
	/**
	 * Whether to prevent URLs get splitted.
	 * @default true
	 */
	safeURLs?: boolean;
	/**
	 * Whether to prevent words get splitted.
	 * @default true
	 */
	safeWords?: boolean;
}
export type StringDissectType = "ANSI" | "Character" | "Emoji" | "Url" | "Word";
export interface StringDescriptor {
	value: string;
	type: StringDissectType;
	typeANSI: boolean;
	typeCharacter: boolean;
	typeEmoji: boolean;
	typeUrl: boolean;
	typeWord: boolean;
}
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 */
export class StringDissector {
	#safeURLs = true;
	#safeWords = true;
	/**
	 * Initialize string dissector.
	 * @param {StringDissectorOptions} [options={}] Options.
	 */
	constructor(options: StringDissectorOptions = {}) {
		if (typeof options.safeURLs === "boolean") {
			this.#safeURLs = options.safeURLs;
		} else if (typeof options.safeURLs !== "undefined") {
			throw new TypeError(`Argument \`options.safeURLs\` must be type of boolean or undefined!`);
		}
		if (typeof options.safeWords === "boolean") {
			this.#safeWords = options.safeWords;
		} else if (typeof options.safeWords !== "undefined") {
			throw new TypeError(`Argument \`options.safeWords\` must be type of boolean or undefined!`);
		}
	}
	/**
	 * Dissect the string.
	 * @param {string} item String that need to dissect.
	 * @returns {StringDescriptor[]} A dissected string.
	 */
	dissect(item: string): StringDescriptor[] {
		if (typeof item !== "string") {
			throw new TypeError(`Argument \`item\` must be type of string!`);
		}
		let result: StringDescriptor[] = [];
		/**
		 * @access private
		 * @param {string} value
		 * @param {StringDissectType} type
		 * @returns {void}
		 */
		function resultPush(value: string, type: StringDissectType): void {
			result.push({
				value,
				type,
				typeANSI: type === "ANSI",
				typeCharacter: type === "Character",
				typeEmoji: type === "Emoji",
				typeUrl: type === "Url",
				typeWord: type === "Word"
			});
		}
		for (let cursor = 0; cursor < item.length; cursor += 1) {
			let itemSlice: string = item.slice(cursor);
			if (itemSlice.search(ansiRegExp) === 0) {
				let value: string = itemSlice.match(ansiRegExp)[0];
				resultPush(value, "ANSI");
				cursor += value.length;
				continue;
			}
			if (itemSlice.search(emojiRegExp) === 0) {
				let value: string = itemSlice.match(emojiRegExp)[0];
				resultPush(value, "Emoji");
				cursor += value.length;
				continue;
			}
			if (this.#safeURLs && itemSlice.search(urlRegExp) === 0) {
				let value: string = itemSlice.match(urlRegExp)[0];
				resultPush(value, "Url");
				cursor += value.length;
				continue;
			}
			if (this.#safeWords && itemSlice.search(wordRegExp) === 0) {
				let value: string = itemSlice.match(wordRegExp)[0];
				resultPush(value, "Word");
				cursor += value.length;
				continue;
			}
			if (itemSlice.search(characterRegExp) === 0) {
				let value: string = itemSlice.match(characterRegExp)[0];
				resultPush(value, "Character");
				cursor += value.length;
				continue;
			}
			resultPush(itemSlice.charAt(0), "Character");
		}
		return result;
	}
	/**
	 * Dissect the string; Safe with the emojis, URLs, and words.
	 * @param {string} item String that need to dissect.
	 * @param {StringDissectorOptions} [options={}] Options.
	 * @returns {StringDescriptor[]} A dissected string.
	 */
	static dissect(item: string, options: StringDissectorOptions = {}): StringDescriptor[] {
		return new this(options).dissect(item);
	}
}
export default StringDissector;
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {StringDescriptor[]} A dissected string.
 */
export function stringDissect(item: string, options: StringDissectorOptions = {}): StringDescriptor[] {
	return new StringDissector(options).dissect(item);
}
