declare module 'wink-nlp-utils' {
    export const string: {
        removeExtraSpaces: (text: string) => string;
        toSentenceCase: (text: string) => string;
    };
}
