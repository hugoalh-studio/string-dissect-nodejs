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
export declare class StringDissector {
    #private;
    /**
     * Initialize string dissector.
     * @param {StringDissectorOptions} [options={}] Options.
     */
    constructor(options?: StringDissectorOptions);
    /**
     * Dissect the string.
     * @param {string} item String that need to dissect.
     * @returns {StringDescriptor[]} A dissected string.
     */
    dissect(item: string): StringDescriptor[];
    /**
     * Dissect the string; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to dissect.
     * @param {StringDissectorOptions} [options={}] Options.
     * @returns {StringDescriptor[]} A dissected string.
     */
    static dissect(item: string, options?: StringDissectorOptions): StringDescriptor[];
}
export default StringDissector;
/**
 * Dissect the string; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to dissect.
 * @param {StringDissectorOptions} [options={}] Options.
 * @returns {StringDescriptor[]} A dissected string.
 */
export declare function stringDissect(item: string, options?: StringDissectorOptions): StringDescriptor[];
//# sourceMappingURL=main.d.ts.map