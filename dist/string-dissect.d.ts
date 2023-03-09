import { StringDescriptor, StringDissectorOptions } from "./string-dissector.js";
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
export { stringDissect };
//# sourceMappingURL=string-dissect.d.ts.map