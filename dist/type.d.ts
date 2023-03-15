export interface StringDissectorOptions {
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
export type StringDissectType = "ANSI" | "Character" | "Emoji" | "Url" | "Word";
export type StringDescriptor = {
    value: string;
    type: StringDissectType;
    typeANSI: boolean;
    typeCharacter: boolean;
    typeEmoji: boolean;
    typeUrl: boolean;
    typeWord: boolean;
};
//# sourceMappingURL=type.d.ts.map