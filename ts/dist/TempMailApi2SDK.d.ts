import { TemporaryEmailEntity } from './entity/TemporaryEmailEntity';
export type * from './TempMailApi2Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TempMailApi2EntityBase } from './TempMailApi2EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TempMailApi2SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    TemporaryEmail(entopts?: Record<string, any>): TemporaryEmailEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TempMailApi2SDK;
    tester(testopts?: any, sdkopts?: any): TempMailApi2SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TempMailApi2SDK;
export { stdutil, config, BaseFeature, TempMailApi2EntityBase, TempMailApi2SDK, SDK, };
