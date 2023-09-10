/**
 * Get the platform specific platform extensions in the format that Webpack expects (with a dot prefix).
 *
 * @param platforms supported platforms in order of priority. ex: ios, android, web, native, electron, etc...
 * @category env
 */
export declare function getModuleFileExtensions(...platforms: string[]): string[];
export declare function getNativeModuleFileExtensions(...platforms: string[]): string[];
export declare type LanguageOptions = {
    isTS: boolean;
    isModern: boolean;
    isReact: boolean;
};
export declare function getExtensions(platforms: string[], extensions: string[]): string[];
export declare function getLanguageExtensionsInOrder({ isTS, isModern, isReact, }: LanguageOptions): string[];
export declare function getBareExtensions(platforms: string[], languageOptions?: LanguageOptions): string[];
