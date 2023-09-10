"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBareExtensions = exports.getLanguageExtensionsInOrder = exports.getExtensions = exports.getNativeModuleFileExtensions = exports.getModuleFileExtensions = void 0;
const assert_1 = __importDefault(require("assert"));
/**
 * Get the platform specific platform extensions in the format that Webpack expects (with a dot prefix).
 *
 * @param platforms supported platforms in order of priority. ex: ios, android, web, native, electron, etc...
 * @category env
 */
function getModuleFileExtensions(...platforms) {
    // Webpack requires a `.` before each value
    return getBareExtensions(platforms).map(value => `.${value}`);
}
exports.getModuleFileExtensions = getModuleFileExtensions;
function getNativeModuleFileExtensions(...platforms) {
    // Webpack requires a `.` before each value
    // Disable modern when using `react-native`
    return getBareExtensions(platforms, { isReact: true, isTS: true, isModern: false }).map(value => `.${value}`);
}
exports.getNativeModuleFileExtensions = getNativeModuleFileExtensions;
function getExtensions(platforms, extensions) {
    // In the past we used spread operators to collect the values so now we enforce type safety on them.
    (0, assert_1.default)(Array.isArray(platforms), 'Expected: `platforms: string[]`');
    (0, assert_1.default)(Array.isArray(extensions), 'Expected: `extensions: string[]`');
    const fileExtensions = [];
    // Ensure order is correct: [platformA.js, platformB.js, js]
    for (const platform of [...platforms, '']) {
        // Support both TypeScript and JavaScript
        for (const extension of extensions) {
            fileExtensions.push([platform, extension].filter(Boolean).join('.'));
        }
    }
    return fileExtensions;
}
exports.getExtensions = getExtensions;
function getLanguageExtensionsInOrder({ isTS, isModern, isReact, }) {
    // @ts-ignore: filter removes false type
    const addLanguage = (lang) => [lang, isReact && `${lang}x`].filter(Boolean);
    // Support JavaScript
    let extensions = addLanguage('js');
    if (isModern) {
        extensions.unshift('mjs');
    }
    if (isTS) {
        extensions = [...addLanguage('ts'), ...extensions];
    }
    return extensions;
}
exports.getLanguageExtensionsInOrder = getLanguageExtensionsInOrder;
function getBareExtensions(platforms, languageOptions = { isTS: true, isModern: true, isReact: true }) {
    const fileExtensions = getExtensions(platforms, getLanguageExtensionsInOrder(languageOptions));
    // Always add these last
    _addMiscellaneousExtensions(platforms, fileExtensions);
    return fileExtensions;
}
exports.getBareExtensions = getBareExtensions;
function _addMiscellaneousExtensions(platforms, fileExtensions) {
    // Always add these with no platform extension
    // In the future we may want to add platform and workspace extensions to json.
    fileExtensions.push('json');
    // Native doesn't currently support web assembly.
    if (platforms.includes('web')) {
        fileExtensions.push('wasm');
    }
    return fileExtensions;
}
//# sourceMappingURL=extensions.js.map