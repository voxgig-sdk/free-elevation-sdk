"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeElevationError = void 0;
class FreeElevationError extends Error {
    isFreeElevationError = true;
    sdk = 'FreeElevation';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FreeElevationError = FreeElevationError;
//# sourceMappingURL=FreeElevationError.js.map