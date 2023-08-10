var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StringDissector_safeURLs, _StringDissector_safeWords;
import ansiRegExpOriginal from "ansi-regex";
import characterRegExpOriginal from "char-regex";
import emojiRegExpOriginal from "emoji-regex";
import urlRegExpOriginal from "url-regex-safe";
const ansiRegExp = new RegExp(ansiRegExpOriginal().source, "u");
const characterRegExp = new RegExp(characterRegExpOriginal().source, "u");
const emojiRegExp = new RegExp(emojiRegExpOriginal().source, "u");
const urlRegExp = new RegExp(urlRegExpOriginal().source, "u");
const wordRegExp = /[\d\w]+(?:[~@#$%&*_'.-][\d\w]+)*/u;
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 */
export class StringDissector {
    /**
     * Initialize string dissector.
     * @param {StringDissectorOptions} [options={}] Options.
     */
    constructor(options = {}) {
        _StringDissector_safeURLs.set(this, true);
        _StringDissector_safeWords.set(this, true);
        if (typeof options.safeURLs === "boolean") {
            __classPrivateFieldSet(this, _StringDissector_safeURLs, options.safeURLs, "f");
        }
        else if (typeof options.safeURLs !== "undefined") {
            throw new TypeError(`Argument \`options.safeURLs\` must be type of boolean or undefined!`);
        }
        if (typeof options.safeWords === "boolean") {
            __classPrivateFieldSet(this, _StringDissector_safeWords, options.safeWords, "f");
        }
        else if (typeof options.safeWords !== "undefined") {
            throw new TypeError(`Argument \`options.safeWords\` must be type of boolean or undefined!`);
        }
    }
    /**
     * Dissect the string.
     * @param {string} item String that need to dissect.
     * @returns {StringDescriptor[]} A dissected string.
     */
    dissect(item) {
        if (typeof item !== "string") {
            throw new TypeError(`Argument \`item\` must be type of string!`);
        }
        let result = [];
        /**
         * @access private
         * @param {string} value
         * @param {StringDissectType} type
         * @returns {void}
         */
        function resultPush(value, type) {
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
            let itemSlice = item.slice(cursor);
            if (itemSlice.search(ansiRegExp) === 0) {
                let value = itemSlice.match(ansiRegExp)[0];
                resultPush(value, "ANSI");
                cursor += value.length;
                continue;
            }
            if (itemSlice.search(emojiRegExp) === 0) {
                let value = itemSlice.match(emojiRegExp)[0];
                resultPush(value, "Emoji");
                cursor += value.length;
                continue;
            }
            if (__classPrivateFieldGet(this, _StringDissector_safeURLs, "f") && itemSlice.search(urlRegExp) === 0) {
                let value = itemSlice.match(urlRegExp)[0];
                resultPush(value, "Url");
                cursor += value.length;
                continue;
            }
            if (__classPrivateFieldGet(this, _StringDissector_safeWords, "f") && itemSlice.search(wordRegExp) === 0) {
                let value = itemSlice.match(wordRegExp)[0];
                resultPush(value, "Word");
                cursor += value.length;
                continue;
            }
            if (itemSlice.search(characterRegExp) === 0) {
                let value = itemSlice.match(characterRegExp)[0];
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
    static dissect(item, options = {}) {
        return new this(options).dissect(item);
    }
}
_StringDissector_safeURLs = new WeakMap(), _StringDissector_safeWords = new WeakMap();
export default StringDissector;
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {StringDescriptor[]} A dissected string.
 */
export function stringDissect(item, options = {}) {
    return new StringDissector(options).dissect(item);
}
