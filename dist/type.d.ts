interface StringDissectorOptions {
    /** Whether to prevent URLs get splitted. [Default: `true`] */
    safeURLs?: boolean;
    /** Whether to prevent words get splitted. [Default: `true`] */
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
export { type StringDissectorOptions, type StringDissectType, type StringDescriptor };
//# sourceMappingURL=type.d.ts.map