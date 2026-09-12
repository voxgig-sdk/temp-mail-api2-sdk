import { Context } from './Context';
declare class TempMailApi2Error extends Error {
    isTempMailApi2Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TempMailApi2Error };
