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
declare class StringDissector {
    #private;
    /**
     * @constructor
     * @description Initialize string dissector.
     * @param {object} [param1={}] Options.
     * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get splitted.
     * @param {boolean} [param1.safeWords=true] Whether to prevent words get splitted.
     */
    constructor({ safeURLs, safeWords }?: StringDissectorOptions);
    /**
     * @method dissect
     * @description Dissect the string.
     * @param {string} item String that need to dissect.
     * @returns {StringDescriptor[]} A dissected string.
     */
    dissect(item: string): StringDescriptor[];
    /**
     * @static dissect
     * @description Dissect the string; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {object} [param1={}] Options.
     * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get splitted.
     * @param {boolean} [param1.safeWords=true] Whether to prevent words get splitted.
     * @returns {StringDescriptor[]} A dissected string.
     */
    static dissect(item: string, { safeURLs, safeWords }?: StringDissectorOptions): StringDescriptor[];
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
declare function stringDissect(item: string, { safeURLs, safeWords }?: StringDissectorOptions): StringDescriptor[];
export { stringDissect, StringDissector, type StringDissectorOptions, type StringDissectType, type StringDescriptor };
declare const _default: {
    stringDissect: typeof stringDissect;
    StringDissector: typeof StringDissector;
};
export default _default;
//# sourceMappingURL=main.d.ts.map