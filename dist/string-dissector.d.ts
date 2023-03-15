import { type StringDescriptor, type StringDissectorOptions } from "./type.js";
/**
 * @class StringDissector
 * @description Dissect the string; Safe with the emojis, URLs, and words.
 */
export declare class StringDissector {
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
//# sourceMappingURL=string-dissector.d.ts.map