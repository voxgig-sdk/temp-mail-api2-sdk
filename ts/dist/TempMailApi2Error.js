"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempMailApi2Error = void 0;
class TempMailApi2Error extends Error {
    isTempMailApi2Error = true;
    sdk = 'TempMailApi2';
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
exports.TempMailApi2Error = TempMailApi2Error;
//# sourceMappingURL=TempMailApi2Error.js.map