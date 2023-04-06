import ansiRegExpOriginal from "ansi-regex";
import characterRegExpOriginal from "char-regex";
import emojiRegExpOriginal from "emoji-regex";
import urlRegExpOriginal from "url-regex-safe";
const ansiRegExp = new RegExp(ansiRegExpOriginal().source, "u");
const characterRegExp = new RegExp(characterRegExpOriginal().source, "u");
const emojiRegExp = new RegExp(emojiRegExpOriginal().source, "u");
const urlRegExp = new RegExp(urlRegExpOriginal().source, "u");
const wordsRegExp = /[\d\w]+(?:[~@#$%&*_'.-][\d\w]+)*/u;
interface StringDissectorOptions {
	/**
	 * @property safeURLs
	 * @description Whether to prevent URLs get splitted.
	 * @default true
	 */
	safeURLs?: boolean;
	/**
	 * @property safeWords
	 * @description Whether to prevent words get splitted.
	 * @default true
	 */
	safeWords?: boolean;
}
type StringDissectType = "ANSI" | "Character" | "Emoji" | "Url" | "Word";
type StringDescriptor = {
	value: string;
	type: StringDissectType;
	typeANSI: boolean;
	typeCharacter: boolean;
	typeEmoji: boolean;
	typeUrl: boolean;
	typeWord: boolean;
};
/**
 * @class StringDissector
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 */
class StringDissector {
	#safeURLs: boolean;
	#safeWords: boolean;
	/**
	 * @constructor
	 * @description Initialize string dissector.
	 * @param {object} [param1={}] Options.
	 * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get splitted.
	 * @param {boolean} [param1.safeWords=true] Whether to prevent words get splitted.
	 */
	constructor({
		safeURLs = true,
		safeWords = true
	}: StringDissectorOptions = {}) {
		if (typeof safeURLs !== "boolean") {
			throw new TypeError(`Argument \`safeURLs\` must be type of boolean!`);
		}
		if (typeof safeWords !== "boolean") {
			throw new TypeError(`Argument \`safeWords\` must be type of boolean!`);
		}
		this.#safeURLs = safeURLs;
		this.#safeWords = safeWords;
	}
	/**
	 * @method dissect
	 * @description Dissect the string.
	 * @param {string} item String that need to dissect.
	 * @returns {StringDescriptor[]} A dissected string.
	 */
	dissect(item: string): StringDescriptor[] {
		if (typeof item !== "string") {
			throw new TypeError(`Argument \`item\` must be type of string!`);
		}
		let itemRaw: string = item;
		let result: StringDescriptor[] = [];
		/**
		 * @access private
		 * @function unshiftItem
		 * @param {string} value
		 * @param {StringDissectType} type
		 * @returns {void}
		 */
		function unshiftItem(value: string, type: StringDissectType): void {
			result.push({
				value,
				type,
				typeANSI: type === "ANSI",
				typeCharacter: type === "Character",
				typeEmoji: type === "Emoji",
				typeUrl: type === "Url",
				typeWord: type === "Word"
			});
			itemRaw = itemRaw.substring(value.length);
		}
		while (itemRaw.length > 0) {
			if (itemRaw.search(ansiRegExp) === 0) {
				unshiftItem(itemRaw.match(ansiRegExp)[0], "ANSI");
				continue;
			}
			if (itemRaw.search(emojiRegExp) === 0) {
				unshiftItem(itemRaw.match(emojiRegExp)[0], "Emoji");
				continue;
			}
			if (this.#safeURLs && itemRaw.search(urlRegExp) === 0) {
				unshiftItem(itemRaw.match(urlRegExp)[0], "Url");
				continue;
			}
			if (this.#safeWords && itemRaw.search(wordsRegExp) === 0) {
				unshiftItem(itemRaw.match(wordsRegExp)[0], "Word");
				continue;
			}
			if (itemRaw.search(characterRegExp) === 0) {
				unshiftItem(itemRaw.match(characterRegExp)[0], "Character");
				continue;
			}
			unshiftItem(itemRaw.charAt(0), "Character");
		}
		return result;
	}
	/**
	 * @static dissect
	 * @description Dissect the string; Safe with the emojis, URLs, and words.
	 * @param {string} item String that need to dissect.
	 * @param {object} [param1={}] Options.
	 * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get splitted.
	 * @param {boolean} [param1.safeWords=true] Whether to prevent words get splitted.
	 * @returns {StringDescriptor[]} A dissected string.
	 */
	static dissect(item: string, {
		safeURLs = true,
		safeWords = true
	}: StringDissectorOptions = {}): StringDescriptor[] {
		return new this({
			safeURLs,
			safeWords
		}).dissect(item);
	}
}
/**
 * @function stringDissect
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {object} [param1={}] Options.
 * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get splitted.
 * @param {boolean} [param1.safeWords=true] Whether to prevent words get splitted.
 * @returns {StringDescriptor[]} A dissected string.
 */
function stringDissect(item: string, {
	safeURLs = true,
	safeWords = true
}: StringDissectorOptions = {}): StringDescriptor[] {
	return new StringDissector({
		safeURLs,
		safeWords
	}).dissect(item);
}
export {
	stringDissect,
	StringDissector,
	type StringDescriptor,
	type StringDissectorOptions,
	type StringDissectType
};
export default {
	stringDissect,
	StringDissector
};
