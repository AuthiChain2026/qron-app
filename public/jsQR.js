/**
 * jsQR - QR code reading library (placeholder)
 *
 * This is a placeholder for the jsQR library used for client-side QR code
 * scanning as a fallback when native camera APIs are unavailable.
 *
 * To use the real library, download jsQR.js from:
 *   https://github.com/cozmo/jsQR/blob/master/dist/jsQR.js
 * or install via npm and copy the built file:
 *   npm install jsqr
 *   cp node_modules/jsqr/dist/jsQR.js public/jsQR.js
 *
 * The NEXT_PUBLIC_ENABLE_QR_FALLBACK environment variable must be set to "true"
 * to activate this fallback.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.jsQR = factory()));
})(this, function () {
  'use strict';

  /**
   * Placeholder jsQR function.
   * Replace this file with the real jsQR library for production use.
   *
   * @param {Uint8ClampedArray} imageData - RGBA pixel data from ImageData
   * @param {number} width - Image width in pixels
   * @param {number} height - Image height in pixels
   * @param {object} [options] - Optional configuration
   * @returns {object|null} QR code result or null if not found
   */
  function jsQR(imageData, width, height, options) {
    console.warn(
      '[jsQR placeholder] The real jsQR library is not installed. ' +
        'Download it from https://github.com/cozmo/jsQR and replace public/jsQR.js.'
    );
    return null;
  }

  return jsQR;
});
