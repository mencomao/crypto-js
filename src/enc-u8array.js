(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Unit8Array encoding strategy.
     */
    var U8array = C_enc.U8array = {
        /**
        * Converts a word array to a Uint8Array.
        *
        * @param {WordArray} wordArray The word array.
        *
        * @return {Uint8Array} The Uint8Array.
        *
        * @static
        *
        * @example
        *
        * var u8arr = CryptoJS.enc.u8array.stringify(wordArray);
        */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            // Convert
            var u8 = new Uint8Array(sigBytes);
            for (var i = 0; i < sigBytes; i++) {
              var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
              u8[i]=byte;
            }
            return u8;
        },

        /**
        * Converts a Uint8Array to a word array.
        *
        * @param {string} u8Str The Uint8Array.
        *
        * @return {WordArray} The word array.
        *
        * @static
        *
        * @example
        *
        * var wordArray = CryptoJS.enc.u8array.parse(u8arr);
        */
        parse: function (u8arr) {
            // Shortcut
            var len = u8arr.length;
            // Convert
            var words = [];
            for (var i = 0; i < len; i++) {
              words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
            }
            return WordArray.create(words, len);
        },
    };

}());
